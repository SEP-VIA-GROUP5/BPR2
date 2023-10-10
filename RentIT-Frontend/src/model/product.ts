import {Tag} from "src/model/tag";
import {Image} from "src/model/image";
import {ProductStatus} from "src/model/productStatus";

export interface Product {
  productId?: number;
  name: string;
  description?: string;
  dayPrice: number;
  weekPrice: number;
  monthPrice: number;
  deposit: number;
  city: string;
  productValue: number;
  minLeasePeriod?: number | null;
  category: string;
  tag: string[];
  images: Image[];
  productStatus: ProductStatus;
  rentedUntil?: string | null;
}
