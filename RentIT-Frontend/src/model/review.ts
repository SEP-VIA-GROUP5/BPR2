import {User} from "src/model/user";

export interface Review {
  id?: number;
  productId?: number;
  rating: number;
  review: string;
  reviewer: User;
}
