import {Image} from "src/model/image";
import {ProductStatus} from "src/model/productStatus";

export interface Product {
  id?: number;
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
  tags: string[];
  images: Image[];
  status: ProductStatus;
  rentedUntil?: string | null;
}
