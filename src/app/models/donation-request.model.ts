export interface DonationRequest {
  id: string;
  postId: string;
  receiverId: string;
  receiverName: string;
  status: string;
  requestTimestamp: string;
  respondedAt: string | null;
}
