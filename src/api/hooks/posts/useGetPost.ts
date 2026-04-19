import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { postsService } from '../../services/posts.service';
import { Post } from '../../types/api';
import { QueryKeys } from '../../queryKeys';

interface ReturnHook {
  data: Post | undefined;
  isLoading: boolean;
  error: unknown;
}

export const useGetPost = (id: string): ReturnHook => {
  const { data, isLoading, error }: UseQueryResult<Post, unknown> = useQuery({
    queryKey: [QueryKeys.Post, id],
    queryFn: async () => {
      const response = await postsService.getById(id);
      return response.data.data.post;
    },
    enabled: !!id,
  });

  return { data, isLoading, error };
};
