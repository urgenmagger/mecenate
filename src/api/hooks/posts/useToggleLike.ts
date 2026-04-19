import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsService } from '../../services/posts.service';
import { Post, PostsResponse } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

interface ReturnHook {
  toggleLike: (postId: string) => Promise<void>;
  isLoading: boolean;
}

export const useToggleLike = (): ReturnHook => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (postId: string) => postsService.toggleLike(postId),
    onSuccess: (response, postId) => {
      const { isLiked, likesCount } = response.data.data;

      // Optimistically update the posts feed cache
      queryClient.setQueriesData<{ pages: { posts: Post[] }[] }>(
        { queryKey: [QueryKeys.Posts] },
        old => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              posts: page.posts.map(post =>
                post.id === postId ? { ...post, isLiked, likesCount } : post,
              ),
            })),
          };
        },
      );

      // Update single post cache if present
      queryClient.setQueryData<Post>([QueryKeys.Post, postId], old => {
        if (!old) return old;
        return { ...old, isLiked, likesCount };
      });
    },
  });

  const toggleLike = async (postId: string) => {
    try {
      await mutateAsync(postId);
    } catch (err) {
      console.error('[ERROR TOGGLE LIKE]', err);
    }
  };

  return { toggleLike, isLoading: isPending };
};
