export interface DonationPost {
  id: string;
  donorId: string;
  donorName: string;
  categoryId: string;
  categoryName: string;
  itemName: string;
  description: string;
  itemCondition: string;
  zone: string;
  photoUrls: string[];
  status: string;
  selectedReceiverId: string;
  createdAt: string;
  reservedAt: string | null;
  closedAt: string | null;
  scheduledDate: string | null;
  scheduledLocation: string;
}
