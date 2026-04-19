export type PostType = 'free' | 'paid';

export interface PostAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  title: string;
  description: string;
  image?: string;
  type: PostType;
  likes: number;
  comments: number;
}
