import {User} from "src/model/user";
import {Review} from "src/model/review";
import {ReviewDTO} from "src/model/reviewDTO";

export const mockedReviews: ReviewDTO[] = [
  {
    review: {
      targetId: "product",
      rating: 5,
      message: "Great product!",
    },
    userDTO: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "sdada@gmail.com",
      phoneNumber: "123123123",
      location: 'Horsens',
    }
  },
  ] satisfies ReviewDTO[];
