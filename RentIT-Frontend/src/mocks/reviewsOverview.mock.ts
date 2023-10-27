import {ReviewsOverview} from "src/model/reviewsOverview";
import {User} from "src/model/user";
import {Review} from "src/model/review";

export const mockedReviewOverviews: ReviewsOverview = {
averageRating: 4.5,
reviews: [
  {
    id: 1,
    productId: 1,
    rating: 5,
    review: "Great product!",
    reviewer: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "sdada@gmail.com",
      phoneNumber: "123123123",
      location: 'Horsens',
    } satisfies User,
  },
  ] satisfies Review[]
}
