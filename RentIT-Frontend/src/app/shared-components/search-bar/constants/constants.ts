import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function constructDefaultFilteringProductOptions(): FilteringProductOptions {
  return {
    name: '',
    category: '',
    city: '',
    deposit: null,
  } satisfies FilteringProductOptions;
}
