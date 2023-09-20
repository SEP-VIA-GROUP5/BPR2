import {Product} from "src/model/product";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {ProductsFetch, ProductsReset} from "src/app/products/products.actions";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {mockedProducts} from "src/mocks/products.mock";
import { environment } from "src/environments/environment.dev";
import { ProductsService } from "src/api/products.service";

export interface ProductsStateModel {
  isFetching: boolean;
  products: Product[];
  pageNumber: number;
  pageSize: number;
}

export const defaultsState: ProductsStateModel = {
  isFetching: false,
  products: [],
  pageNumber: 1,
  pageSize: 12,
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

    let products = [];

    try {
      products = await this.productsService.getProductsPerPage(pageNumber, pageSize);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      console.error('error');
    }

    newState = produce(getState(), draft => {
      draft.products = products;
      draft.pageNumber = pageNumber + 1;
      draft.pageSize = pageSize;
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
