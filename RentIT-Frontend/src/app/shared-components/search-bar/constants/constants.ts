import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function constructDefaultFilteringProductOptions(): FilteringProductOptions {
  return {
    name: '',
    category: '',
    city: '',
    depositFrom: null,
    depositTo: null,
    dayPriceFrom: null,
    dayPriceTo: null,
    weekPriceFrom: null,
    weekPriceTo: null,
    monthPriceFrom: null,
    monthPriceTo: null,
    productValueFrom: null,
    productValueTo: null
  } satisfies FilteringProductOptions;
}

export type ProductPriceFilters = 'Deposit' | 'Day price' | 'Week price' | 'Month price' | 'Product value';
