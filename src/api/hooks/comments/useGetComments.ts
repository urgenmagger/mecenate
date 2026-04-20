import { useInfiniteQuery } from '@tanstack/react-query';

import { commentsService } from '../../services/comments.service';
import { Comment } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

type CommentsPage = {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
};

interface ReturnHook {
  data: Comment[] | undefined;
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export const useGetComments = (postId: string): ReturnHook => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<CommentsPage, unknown>({
    queryKey: [QueryKeys.Comments, postId],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await commentsService.getByPostId(postId, {
        limit: 20,
        cursor: pageParam as string | undefined,
      });
      return response.data.data;
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
    enabled: !!postId,
  });

  const comments = data?.pages.flatMap((page: CommentsPage) => page.comments);

  return {
    data: comments,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: Boolean(hasNextPage),
  };
};
