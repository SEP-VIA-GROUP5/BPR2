import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {NbToastrService} from "@nebular/theme";
import {Product} from "src/model/product";
import {MyProductsFetch, MyProductsReset, RemoveProducts} from "src/app/my-products/my-products.actions";
import {ProductsService} from "src/api/products.service";
import {mockedProducts} from "src/mocks/products.mock";

export interface MyProductsStateModel {
  isFetching: boolean;
  products: Product[];
}

export const defaultsState: MyProductsStateModel = {
  isFetching: false,
  products: [],
}

@State<MyProductsStateModel>({
  name: 'myProductsPage',
  defaults: defaultsState,
})

@Injectable()
export class MyProductsState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
  ) {
  }

  @Action(MyProductsFetch)
  async myProductsFetch(
    { getState, setState }: StateContext<MyProductsStateModel>,
    action: MyProductsFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    // here will come service for fetching user's products
    let products = mockedProducts;

    newState = produce(getState(), draft => {
      draft.products = products;
      draft.isFetching = false;
    });
    setState(newState);
  }

  @Action(RemoveProducts)
  async removeProducts(
    { getState, setState }: StateContext<MyProductsStateModel>,
    action: RemoveProducts) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    // here will come service for deleting products

    newState = produce(getState(), draft => {
      draft.products = draft.products.filter(product => !action.products.includes(product));
      draft.isFetching = false;
    });
    setState(newState);
    window.location.reload();
  }

  @Action(MyProductsReset)
  async myProductsReset(
    { setState } : StateContext<MyProductsStateModel>) {
    setState(defaultsState);
  }


}
