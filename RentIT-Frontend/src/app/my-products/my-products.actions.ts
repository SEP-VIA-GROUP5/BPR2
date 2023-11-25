import {Product} from "src/model/product";
import {ProductSelected} from "src/app/shared-components/product-card/constants/constants";

export class MyProductsFetch {
  static readonly type = '[My products] Fetch';
}

export class RemoveProducts {
  static readonly type = '[My products] Remove products';

  constructor(public products: Product[]) {
  }
}

export class ChangeProductsStatus {
  static readonly type = '[My products] Change products status';
  constructor(public productsSelected: ProductSelected[]) {
  }
}

export class MyProductsReset {
  static readonly type = '[My products] Reset';
}
