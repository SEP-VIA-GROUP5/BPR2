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
  if (filteringProductOptions.deposit) {
    mapper.set('deposit', filteringProductOptions.deposit.toString());
  }
  if (filteringProductOptions.category) {
    mapper.set('category', filteringProductOptions.category);
  }
  if (filteringProductOptions.dayPrice) {
    mapper.set('day_price', filteringProductOptions.dayPrice.toString());
  }
  if (filteringProductOptions.weekPrice) {
    mapper.set('week_price', filteringProductOptions.weekPrice.toString());
  }
  if (filteringProductOptions.monthPrice) {
    mapper.set('month_price', filteringProductOptions.monthPrice.toString());
  }
  if (filteringProductOptions.productValue) {
    mapper.set('product_value', filteringProductOptions.productValue.toString());
  }
  return mapper;
}
