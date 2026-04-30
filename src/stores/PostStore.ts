import { makeAutoObservable } from 'mobx';
import { Comment } from '../api/types/api';

export class PostStore {
  likesCount = 0;
  isLiked = false;
  comments: Comment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  init(likesCount: number, isLiked: boolean) {
    this.likesCount = likesCount;
    this.isLiked = isLiked;
  }

  applyLike(isLiked: boolean, likesCount: number) {
    this.isLiked = isLiked;
    this.likesCount = likesCount;
  }

  setComments(comments: Comment[]) {
    this.comments = comments;
  }

  applyNewComment(comment: Comment) {
    const exists = this.comments.some((c) => c.id === comment.id);
    if (!exists) {
      this.comments = [comment, ...this.comments];
    }
  }
}
