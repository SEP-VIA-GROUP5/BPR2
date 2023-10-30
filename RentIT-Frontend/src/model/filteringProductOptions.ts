import {ProductStatus} from "src/model/productStatus";

export interface FilteringProductOptions {
  name?: string;
  productCategory?: string;
  city?: string;
  productStatus?: ProductStatus;
  productPriceFrom?: number;
  productPriceTo?: number;
}
