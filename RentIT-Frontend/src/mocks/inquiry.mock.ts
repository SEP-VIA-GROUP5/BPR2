import {Inquiry} from "src/model/inquiry";

export const inquiryMock: Inquiry[] = [
  {
    inquiryId: 1,
    productId: 1,
    message: 'I want to rent this product',
    timeStamp: new Date(),
    senderId: 1,
    senderEmail: '',
    senderPhoneNumber: '',
    receiverId: 2,
    viewed: false,
    viewedAt: null,
    rentStart: new Date(),
    rentEnd: new Date(),
  },
]

// export interface Inquiry {
//   inquiryId?: number;
//   productId: number;
//   message: string;
//   timeStamp?: Date;
//   senderId?: number;
//   senderEmail?: string;
//   senderPhoneNumber?: string;
//   receiverId?: number;
//   viewed?: boolean;
//   viewedAt?: Date;
//   rentStart?: Date;
//   rentEnd?: Date;
// }
