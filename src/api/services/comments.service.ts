import { apiClient } from '../client';
import { CommentCreatedResponse, CommentsResponse } from '../types/api';

export const commentsService = {
  async getByPostId(
    postId: string,
    params?: { limit?: number; cursor?: string },
  ) {
    return apiClient.get<CommentsResponse>(`/posts/${postId}/comments`, {
      params,
    });
  },

  async create(postId: string, text: string) {
    return apiClient.post<CommentCreatedResponse>(`/posts/${postId}/comments`, {
      text,
    });
  },
};
