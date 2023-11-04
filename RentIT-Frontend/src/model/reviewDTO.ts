import {Review} from "src/model/review";
import {User} from "src/model/user";

export interface ReviewDTO {
  review: Review;
  userDTO: User;
}
