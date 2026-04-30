import { useEffect, useRef } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Comment, Post } from '../../types/api';
import { QueryKeys } from '../../queryKeys';
import { PostStore } from '../../../stores/PostStore';

const WS_URL = 'wss://k8s.mectest.ru/test-app/ws';
const USER_UUID = '550e8400-e29b-41d4-a716-446655440000';

type WsEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | { type: 'comment_added'; postId: string; comment: Comment };

type CommentsQueryData = {
  pages: { comments: Comment[] }[];
};

type CommentsPage = {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
};

const prependCommentToCache = (
  old: InfiniteData<CommentsPage, string | undefined> | undefined,
  comment: Comment,
) => {
  if (!old) {
    return {
      pages: [
        {
          comments: [comment],
          nextCursor: null,
          hasMore: false,
        },
      ],
      pageParams: [undefined],
    };
  }

  const exists = old.pages.some((page) =>
    page.comments.some((cachedComment) => cachedComment.id === comment.id),
  );

  if (exists) {
    return old;
  }

  const [firstPage, ...restPages] = old.pages;

  if (!firstPage) {
    return old;
  }

  return {
    ...old,
    pages: [
      {
        ...firstPage,
        comments: [comment, ...firstPage.comments],
      },
      ...restPages,
    ],
  };
};

export const usePostWebSocket = (postId: string, postStore: PostStore) => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;

    const connect = () => {
      if (!active) return;
      const ws = new WebSocket(`${WS_URL}?token=${USER_UUID}`);
      wsRef.current = ws;

      ws.onmessage = (e) => {
        try {
          const event: WsEvent = JSON.parse(e.data);
          if (event.type === 'ping') return;

          if (event.type === 'like_updated' && event.postId === postId) {
            postStore.applyLike(postStore.isLiked, event.likesCount);
            queryClient.setQueryData<Post>([QueryKeys.Post, postId], (old) =>
              old ? { ...old, likesCount: event.likesCount } : old,
            );
          }

          if (event.type === 'comment_added' && event.postId === postId) {
            const cachedComments = queryClient.getQueryData<CommentsQueryData>([
              QueryKeys.Comments,
              postId,
            ]);
            const commentExists =
              postStore.comments.some((comment) => comment.id === event.comment.id) ||
              cachedComments?.pages.some((page) =>
                page.comments.some((comment) => comment.id === event.comment.id),
              );

            if (commentExists) {
              return;
            }

            postStore.applyNewComment(event.comment);
            queryClient.setQueryData<InfiniteData<CommentsPage, string | undefined>>(
              [QueryKeys.Comments, postId],
              (old) => prependCommentToCache(old, event.comment),
            );
            queryClient.setQueryData<Post>([QueryKeys.Post, postId], (old) =>
              old ? { ...old, commentsCount: old.commentsCount + 1 } : old,
            );
            queryClient.setQueriesData<{ pages: { posts: Post[] }[] }>(
              { queryKey: [QueryKeys.Posts] },
              (old) => {
                if (!old) return old;
                return {
                  ...old,
                  pages: old.pages.map((page) => ({
                    ...page,
                    posts: page.posts.map((post) =>
                      post.id === postId
                        ? { ...post, commentsCount: post.commentsCount + 1 }
                        : post,
                    ),
                  })),
                };
              },
            );
          }
        } catch {}
      };

      ws.onclose = () => {
        if (active) {
          reconnectTimer.current = setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      active = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [postId, postStore, queryClient]);
};
