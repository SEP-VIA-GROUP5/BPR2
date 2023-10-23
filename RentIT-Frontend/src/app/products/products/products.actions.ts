import {FilteringProductOptions} from "src/model/filteringProductOptions";

export class ProductsFetch {
  static readonly type = '[Products] Fetch';
  constructor() {
  }
}

export class ProductsByFilter {
  static readonly type = '[Products] Fetch products by filter';
  constructor(public filteringProductOptions: FilteringProductOptions) {
  }
}

export class ProductsResetFilter {
  static readonly type = '[Products] Reset filter';
  constructor() {
  }
}

export class ProductsReset {
  static readonly type = '[Products] Reset';
  constructor() {
  }
}

