import {Product} from "src/model/product";
import {User} from "src/model/user";

export interface ProductOverview {
  product: Product,
  user: User,
}
