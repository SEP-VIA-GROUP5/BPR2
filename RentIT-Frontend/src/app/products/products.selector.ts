import {Selector} from "@ngxs/store";
import {ProductsState, ProductsStateModel} from "src/app/products/products.state";

export class ProductsSelector {
  @Selector([ProductsState])
  static isFetching(state: ProductsStateModel) {
    return state.isFetching;
  }

  @Selector([ProductsState])
  static products(state: ProductsStateModel) {
    return state.products;
  }

  @Selector([ProductsState])
  static endOfList(state: ProductsStateModel) {
    return state.endOfList;
  }
}
