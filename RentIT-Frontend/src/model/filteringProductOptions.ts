import {ProductStatus} from "src/model/productStatus";

export interface FilteringProductOptions {
  name?: string;
  city?: string;
  deposit?: number;
  productCategory?: string;
  productStatus?: ProductStatus;
  productPriceFrom?: number;
  productPriceTo?: number;
}
