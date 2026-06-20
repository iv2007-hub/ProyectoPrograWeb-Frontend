export interface DeliveryRecord {
  id: string;
  postId: string;
  donorId: string;
  receiverId: string;
  itemName: string;
  categoryId: string;
  deliveryDate: string;
  deliveryLocation: string;
  confirmedByDonor: boolean;
  confirmedByReceiver: boolean;
  completedAt: string;
}
