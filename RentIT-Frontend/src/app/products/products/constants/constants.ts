import {FilteringProductOptions} from "src/model/filteringProductOptions";

export function mapToMapperFromFilteringOptions(filteringProductOptions: FilteringProductOptions): Map<string, string>  {
  const mapper = new Map<string, string>();
  if (!filteringProductOptions) {
    return mapper;
  }

  if (filteringProductOptions.name) {
    mapper.set('name', filteringProductOptions.name);
  }
  if (filteringProductOptions.city) {
    mapper.set('city', filteringProductOptions.city);
  }
  if (filteringProductOptions.depositFrom) {
    mapper.set('deposit', filteringProductOptions.depositFrom.toString());
  }
  if (filteringProductOptions.category) {
    mapper.set('category', filteringProductOptions.category);
  }
  if (filteringProductOptions.dayPriceFrom) {
    mapper.set('day_price', filteringProductOptions.dayPriceFrom.toString());
  }
  if (filteringProductOptions.weekPriceFrom) {
    mapper.set('week_price', filteringProductOptions.weekPriceFrom.toString());
  }
  if (filteringProductOptions.monthPriceFrom) {
    mapper.set('month_price', filteringProductOptions.monthPriceFrom.toString());
  }
  if (filteringProductOptions.productValueFrom) {
    mapper.set('product_value', filteringProductOptions.productValueFrom.toString());
  }
  return mapper;
}
