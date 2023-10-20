import {Product} from "src/model/product";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductService} from "src/api/product.service";
import {ProductFetch, ProductReset} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";

export interface ProductStateModel {
  isFetching: boolean;
  product: ProductOverview;
}

export const defaultsState: ProductStateModel = {
  isFetching: false,
  product: null,
}

@State<ProductStateModel>({
  name: 'productPage',
  defaults: defaultsState,
})

@Injectable()
export class ProductState {
  constructor(
    private toastrService: NbToastrService,
    private productService: ProductService,
  ) {
  }

  @Action(ProductFetch)
  async productFetch(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let product = null;
    try {
      product = await this.productService.getProductById(action.productId);
      newState = produce(getState(), draft => {
        draft.product = product;
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);
    }
  }

  @Action(ProductReset)
  async productReset(
    { setState }: StateContext<ProductStateModel>) {
    setState(defaultsState);
  };
}
