import {Tag} from "src/model/tag";

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
  tag: Tag; //TODO probably this will come as array
}
