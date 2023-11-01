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
  return mapper;
}
