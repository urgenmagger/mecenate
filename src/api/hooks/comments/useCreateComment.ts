import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentsService } from '../../services/comments.service';
import { Comment } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

interface ReturnHook {
  createComment: (postId: string, text: string) => Promise<Comment | undefined>;
  isLoading: boolean;
}

export const useCreateComment = (): ReturnHook => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) =>
      commentsService.create(postId, text),
    onSuccess: (response, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Comments, postId],
      });

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
