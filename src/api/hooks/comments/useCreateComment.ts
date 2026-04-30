import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { commentsService } from '../../services/comments.service';
import { Comment, Post } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

interface ReturnHook {
  createComment: (postId: string, text: string) => Promise<Comment | undefined>;
  isLoading: boolean;
}

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

export const useCreateComment = (): ReturnHook => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) =>
      commentsService.create(postId, text),
    onSuccess: (response, { postId }) => {
      const createdComment = response.data.data.comment;
      const cachedComments = queryClient.getQueryData<InfiniteData<CommentsPage, string | undefined>>([
        QueryKeys.Comments,
        postId,
      ]);
      const commentAlreadyCached = cachedComments?.pages.some((page) =>
        page.comments.some((comment) => comment.id === createdComment.id),
      );

      if (!commentAlreadyCached) {
        queryClient.setQueryData<InfiniteData<CommentsPage, string | undefined>>(
          [QueryKeys.Comments, postId],
          (old) => prependCommentToCache(old, createdComment),
        );

        queryClient.setQueryData<Post>([QueryKeys.Post, postId], old =>
          old ? { ...old, commentsCount: old.commentsCount + 1 } : old,
        );

        // Increment comment count in posts feed cache
        queryClient.setQueriesData<{ pages: { posts: { id: string; commentsCount: number }[] }[] }>(
          { queryKey: [QueryKeys.Posts] },
          old => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map(page => ({
                ...page,
                posts: page.posts.map(post =>
                  post.id === postId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post,
                ),
              })),
            };
          },
        );
      }
    },
  });

  const createComment = async (postId: string, text: string) => {
    try {
      const response = await mutateAsync({ postId, text });
      return response.data.data.comment;
    } catch (err) {
      console.error('[ERROR CREATE COMMENT]', err);
    }
  };

  return { createComment, isLoading: isPending };
};
