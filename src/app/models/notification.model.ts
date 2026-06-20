export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  postId: string;
  isRead: boolean;
  createdAt: string;
}
