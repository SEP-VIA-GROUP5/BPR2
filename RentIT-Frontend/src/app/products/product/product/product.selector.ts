import {Selector} from "@ngxs/store";
import {ProductState, ProductStateModel} from "src/app/products/product/product/product.state";

export class ProductSelector {
  @Selector([ProductState])
  static isFetching(state: ProductStateModel) {
    return state.isFetching;
  }

  @Selector([ProductState])
  static product(state: ProductStateModel) {
    return state.product;
  }
}
