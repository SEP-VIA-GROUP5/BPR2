import {Review} from "src/model/review";

export interface ReviewsOverview {
  averageRating: number;
  reviews : Review[];
}
