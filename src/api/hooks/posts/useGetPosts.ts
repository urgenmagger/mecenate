import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { postsService } from '../../services/posts.service';
import { Post } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

type PostsPage = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

interface Params {
  tier?: 'free' | 'paid';
  limit?: number;
}

interface ReturnHook {
  data: Post[] | undefined;
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export const useGetPosts = (params?: Params): ReturnHook => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<PostsPage, unknown> = useInfiniteQuery({
    queryKey: [QueryKeys.Posts, params],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await postsService.getFeed({
        limit: params?.limit ?? 10,
        tier: params?.tier,
        cursor: pageParam,
      });
      return response.data.data;
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
    select: _data => ({
      pages: _data.pages,
      pageParams: _data.pageParams,
    }),
    staleTime: 5 * 60 * 1000,
  });

  const posts = data?.pages.flatMap(page => page.posts);

  return {
    data: posts,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
