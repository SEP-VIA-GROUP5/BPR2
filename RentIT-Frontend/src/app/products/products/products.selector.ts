import {Selector} from "@ngxs/store";
import {ProductsState, ProductsStateModel} from "src/app/products/products/products.state";

export class ProductsSelector {
  @Selector([ProductsState])
  static isFetching(state: ProductsStateModel) {
    return state.isFetching;
  }

  @Selector([ProductsState])
  static products(state: ProductsStateModel) {
    return state.isListOnFiltering ? state.productsOnFiltering : state.products;
  }

  @Selector([ProductsState])
  static endOfList(state: ProductsStateModel) {
    return state.isListOnFiltering ? state.endOfListOnFiltering : state.endOfList;
  }

  @Selector([ProductsState])
  static isListOnFiltering(state: ProductsStateModel) {
    return state.isListOnFiltering;
  }

  @Selector([ProductsState])
  static currentFilteringOptions(state: ProductsStateModel) {
    return state.currentFilteringOptions;
  }
}
