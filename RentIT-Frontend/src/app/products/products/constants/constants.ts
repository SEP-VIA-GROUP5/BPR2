import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function mapToMapperFromFilteringOptions(filteringProductOptions: FilteringProductOptions): Map<string, string>  {
  const mapper = new Map<string, string>();
  if (!filteringProductOptions) {
    return mapper;
  }

  if (filteringProductOptions.name) {
    mapper.set('name', filteringProductOptions.name);
  }
  if (filteringProductOptions.productCategory) {
    mapper.set('productCategory', filteringProductOptions.productCategory);
  }
  if (filteringProductOptions.city) {
    mapper.set('city', filteringProductOptions.city);
  }
  if (filteringProductOptions.productStatus) {
    mapper.set('productStatus', filteringProductOptions.productStatus);
  }
  if (filteringProductOptions.productPriceFrom) {
    mapper.set('productPriceFrom', filteringProductOptions.productPriceFrom.toString());
  }
  if (filteringProductOptions.productPriceTo) {
    mapper.set('productPriceTo', filteringProductOptions.productPriceTo.toString());
  }
  return mapper;
}
