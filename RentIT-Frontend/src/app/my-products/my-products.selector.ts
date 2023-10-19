import {Selector} from "@ngxs/store";
import {MyProductsState, MyProductsStateModel} from "src/app/my-products/my-products.state";

export class MyProductsSelector {
  @Selector([MyProductsState])
  static isFetching(state: MyProductsStateModel) {
    return state.isFetching;
  }

  @Selector([MyProductsState])
  static products(state: MyProductsStateModel) {
    return state.products;
  }
}
