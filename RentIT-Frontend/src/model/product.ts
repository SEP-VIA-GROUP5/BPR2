import {Tag} from "src/model/tag";
import {Image} from "src/model/image";

export interface Product {
  productId: number;
  name: string;
  description?: string;
  dayPrice: number;
  weekPrice: number;
  monthPrice: number;
  deposit?: number | null;
  productValue?: number | null;
  city: string;
  minLeasePeriod?: number | null;
  category: string;
  tag: string[];
  images: Image[];
}
