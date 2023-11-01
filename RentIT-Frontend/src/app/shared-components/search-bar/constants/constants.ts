import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function constructDefaultFilteringProductOptions(): FilteringProductOptions {
  return {
    name: '',
    productCategory: '',
    city: '',
    deposit: null,
    productStatus: null,
    productPriceFrom: null,
    productPriceTo: null,
  } satisfies FilteringProductOptions;
}
