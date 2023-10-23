import {ProductStatus} from "src/model/productStatus";

export interface FilteringProductOptions {
  productName?: string;
  productCategory?: string;
  productCity?: string;
  productStatus?: ProductStatus;
  productPriceFrom?: number;
  productPriceTo?: number;
}
