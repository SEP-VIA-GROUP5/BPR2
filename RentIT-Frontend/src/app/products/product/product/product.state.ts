import {Product} from "src/model/product";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductService} from "src/api/product.service";
import {
  ProductFetch,
  ProductReset,
  ProductReviewsOverviewFetch
} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";
import {ReviewsOverview} from "src/model/reviewsOverview";
import {ReviewsService} from "src/api/reviews.service";

export interface ProductStateModel {
  isFetchingProduct: boolean;
  isFetchingReviewsOverview: boolean;
  product: ProductOverview;
  reviewsOverview: ReviewsOverview;
}

export const defaultsState: ProductStateModel = {
  isFetchingProduct: false,
  isFetchingReviewsOverview: false,
  product: null,
  reviewsOverview: null,
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
    private reviewsService: ReviewsService,
  ) {
  }

  @Action(ProductFetch)
  async productFetch(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetchingProduct = true;
    });
    setState(newState);

    let product = null;
    try {
      product = await this.productService.getProductById(action.productId);
      newState = produce(getState(), draft => {
        draft.product = product;
        draft.isFetchingProduct = false;
      });
      return setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingProduct = false;
      });
      return setState(newState);
    }
  }

  @Action(ProductReviewsOverviewFetch)
  async productReviewsOverviewFetch(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductReviewsOverviewFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetchingReviewsOverview = true;
    });
    setState(newState);

    let reviewsOverview = null;
    try {
      // TODO here comes the api, but for now mock it;
      reviewsOverview = await this.reviewsService.getReviewsOverview(action.productId);
      newState = produce(getState(), draft => {
        draft.reviewsOverview = reviewsOverview;
        draft.isFetchingReviewsOverview = false;
      });
      return setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingReviewsOverview = false;
      });
      return setState(newState);
    }
  }

  @Action(ProductReset)
  async productReset(
    {setState}: StateContext<ProductStateModel>) {
    setState(defaultsState);
  };
}
