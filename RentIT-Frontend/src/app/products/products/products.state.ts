import {Product} from "src/model/product";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import { environment } from "src/environments/environment.dev";
import { ProductsService } from "src/api/products.service";
import {ProductsFetch, ProductsReset} from "src/app/products/products/products.actions";

export interface ProductsStateModel {
  isFetching: boolean;
  products: Product[];
  pageNumber: number;
  pageSize: number;
  endOfList: boolean;
}

export const defaultsState: ProductsStateModel = {
  isFetching: false,
  products: [],
  pageNumber: 1,
  pageSize: 12,
  endOfList: false,
}

@State<ProductsStateModel>({
  name: 'productsPage',
  defaults: defaultsState,
})

@Injectable()
export class ProductsState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
  ) {
  }

  @Action(ProductsFetch)
  async productsFetch(
    {getState, setState}: StateContext<ProductsStateModel>) {

    let pageNumber = getState().pageNumber;
    let pageSize = getState().pageSize;
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let nextProducts = [];

    try {
      nextProducts = await this.productsService.getProductsPerPage(pageNumber, pageSize);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }

    newState = produce(getState(), draft => {
      let currentProducts = draft.products;
      draft.products = [...currentProducts,...nextProducts];
      draft.pageNumber = pageNumber + 1;
      draft.endOfList = nextProducts.length !== draft.pageSize;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(ProductsReset)
  async productsReset(
    { setState }: StateContext<ProductsStateModel>) {
   setState(defaultsState);
  };
}
