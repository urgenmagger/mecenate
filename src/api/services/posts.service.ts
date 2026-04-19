import { apiClient } from '../client';
import {
  LikeResponse,
  PostDetailResponse,
  PostsResponse,
} from '../types/api';

export const postsService = {
  async getFeed(params?: {
    limit?: number;
    cursor?: string;
    tier?: 'free' | 'paid';
    simulate_error?: boolean;
  }) {
    return apiClient.get<PostsResponse>('/posts', { params });
  },

  async getById(id: string) {
    return apiClient.get<PostDetailResponse>(`/posts/${id}`);
  },

  async toggleLike(id: string) {
    return apiClient.post<LikeResponse>(`/posts/${id}/like`);
  },
};
