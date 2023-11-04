import {User} from "src/model/user";

export interface Review {
  // this is gathered when receiving data, not adding
  // this can be userEmail or productId
  targetId?: string;
  rating: number;
  message: string;
}

export enum TARGET {
  USER = 'user',
  PRODUCT = 'product',
}
