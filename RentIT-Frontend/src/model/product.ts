import {Image} from "src/model/image";
import {ProductStatus} from "src/model/productStatus";
import {ReviewsOverview} from "src/model/reviewsOverview";

export interface Product {
  id?: number;
  name: string;
  reviewsOverview?: ReviewsOverview;
  description?: string;
  dayPrice: number;
  weekPrice: number;
  monthPrice: number;
  deposit: number;
  city: string;
  productValue: number;
  minLeasePeriod?: number | null;
  category: string;
  tags: string[];
  images: Image[];
  status: ProductStatus;
  rentedUntil?: string | null;
}
