import { PostStore } from './PostStore';

export class RootStore {
  postStore = new PostStore();
}

export const rootStore = new RootStore();
