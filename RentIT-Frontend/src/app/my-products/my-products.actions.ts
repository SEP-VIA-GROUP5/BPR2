import {Product} from "src/model/product";

export class MyProductsFetch {
  static readonly type = '[My products] Fetch';
}

export class RemoveProducts {
  static readonly type = '[My products] Remove products';

  constructor(public products: Product[]) {
  }
}

export class MyProductsReset {
  static readonly type = '[My products] Reset';
}
