import {Selector} from "@ngxs/store";
import {AddingProductsState, AddingProductsStateModel} from "src/app/products/adding-products/adding-products.state";

export class AddingProductsSelectors {
  @Selector([AddingProductsState])
  static isFetching(state: AddingProductsStateModel) {
    return state.isFetching;
  }
}
