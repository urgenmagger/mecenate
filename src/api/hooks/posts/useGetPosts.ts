import { useInfiniteQuery } from '@tanstack/react-query';

import { postsService } from "../../services/posts.service";
import { Post } from "../../types/api";
import { QueryKeys } from "../../queryKeys";

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
  isRefetching: boolean;
  error: unknown;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  refetch: () => void;
}

export const useGetPosts = (params?: Params): ReturnHook => {
  const limit = params?.limit ?? 3;

  const {
    data,
    isLoading,
    isRefetching,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<PostsPage, unknown>({
    queryKey: [QueryKeys.Posts, params?.tier, limit],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await postsService.getFeed({
        limit,
        tier: params?.tier,
        cursor: pageParam as string | undefined,
      });
      return response.data.data;
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const posts = data?.pages.flatMap((page: PostsPage) => page.posts);

  return {
    data: posts,
    isLoading,
    isRefetching,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: Boolean(hasNextPage),
    refetch,
  };
};
