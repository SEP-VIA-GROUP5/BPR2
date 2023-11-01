import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function constructDefaultFilteringProductOptions(): FilteringProductOptions {
  return {
    name: '',
    category: '',
    city: '',
    deposit: null,
    dayPrice: null,
    weekPrice: null,
    monthPrice: null,
    productValue: null
  } satisfies FilteringProductOptions;
}
