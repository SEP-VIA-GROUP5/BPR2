import {User} from "src/model/user";
import {Review} from "src/model/review";

export const mockedReviews: Review[] = [
  {
    targetId: "product",
    rating: 5,
    message: "Great product!",
    reviewer: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "sdada@gmail.com",
      phoneNumber: "123123123",
      location: 'Horsens',
    } satisfies User,
  },
  ] satisfies Review[];
