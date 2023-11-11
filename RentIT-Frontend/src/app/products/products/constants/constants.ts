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
    mapper.set('deposit_up', filteringProductOptions.depositFrom.toString());
  }
  if (filteringProductOptions.depositTo) {
    mapper.set('deposit_down', filteringProductOptions.depositTo.toString());
  }
  if (filteringProductOptions.category) {
    mapper.set('category', filteringProductOptions.category);
  }
  // TODO THESE DOES NOT WORK AT THE MOMENT
  if (filteringProductOptions.dayPriceFrom) {
    mapper.set('day_price_up', filteringProductOptions.dayPriceFrom.toString());
  }
  if (filteringProductOptions.dayPriceTo) {
    mapper.set('day_price_down', filteringProductOptions.dayPriceTo.toString());
  }
  if (filteringProductOptions.weekPriceFrom) {
    mapper.set('week_price_up', filteringProductOptions.weekPriceFrom.toString());
  }
  if (filteringProductOptions.weekPriceTo) {
    mapper.set('week_price_down', filteringProductOptions.weekPriceTo.toString());
  }
  if (filteringProductOptions.monthPriceFrom) {
    mapper.set('month_price_up', filteringProductOptions.monthPriceFrom.toString());
  }
  if (filteringProductOptions.monthPriceTo) {
    mapper.set('month_price_down', filteringProductOptions.monthPriceTo.toString());
  }
  if (filteringProductOptions.productValueFrom) {
    mapper.set('product_value_up', filteringProductOptions.productValueFrom.toString());
  }
  if (filteringProductOptions.productValueTo) {
    mapper.set('product_value_down', filteringProductOptions.productValueTo.toString());
  }
  return mapper;
}
