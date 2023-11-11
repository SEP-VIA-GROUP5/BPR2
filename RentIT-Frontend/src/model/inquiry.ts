export interface Inquiry {
  inquiryId?: number;
  productId: number;
  message: string;
  timeStamp?: Date;
  senderId?: number;
  senderEmail?: string;
  senderPhoneNumber?: string;
  receiverId?: number;
  viewed?: boolean;
  viewedAt?: Date;
  rentStart: Date;
  rentEnd: Date;
}
