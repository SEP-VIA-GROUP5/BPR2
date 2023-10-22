import {FilteredOptionsEnum} from "src/app/shared-components/search-bar/constants/constants";

export class ProductsFetch {
  static readonly type = '[Products] Fetch';
  constructor() {
  }
}

export class ProductsByFilter {
  static readonly type = '[Products] Fetch products by filter';
  constructor(public searchInput: string,
              public filteredOptionChose: FilteredOptionsEnum) {
  }
}

export class ProductsReset {
  static readonly type = '[Products] Reset';
  constructor() {
  }
}

