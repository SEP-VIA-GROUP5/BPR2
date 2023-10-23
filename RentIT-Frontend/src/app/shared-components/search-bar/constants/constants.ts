import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function constructDefaultFilteringProductOptions(): FilteringProductOptions {
  return {
    productName: '',
    productCategory: '',
    productCity: '',
    productStatus: null,
    productPriceFrom: null,
    productPriceTo: null,
  } satisfies FilteringProductOptions;
}
