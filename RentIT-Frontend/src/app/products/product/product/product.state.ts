import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductService} from "src/api/product.service";
import {
  ProductAddReview,
  ProductAverageRatingReviewFetch,
  ProductFetch,
  ProductReset,
  ProductReviewsFetch
} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";
import {ReviewsService} from "src/api/reviews.service";
import {Review, TARGET} from "src/model/review";

export interface ProductStateModel {
  // product
  isFetchingProduct: boolean;
  product: ProductOverview;
  // reviews
  isFetchingReviewsOverview: boolean;
  reviews: Review[];
  averageRating: number;
  pageSizeReviews: number;
  pageNumberReviews: number;
  endOfListReviews: boolean;
}

export const defaultsState: ProductStateModel = {
  isFetchingProduct: false,
  product: null,
  isFetchingReviewsOverview: false,
  reviews: [],
  averageRating: null,
  pageSizeReviews: 5,
  pageNumberReviews: 1,
  endOfListReviews: false,
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

  @Action(ProductReviewsFetch)
  async productReviewsOverviewFetch(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductReviewsFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetchingReviewsOverview = true;
    });
    setState(newState);

    let reviews = [];
    try {
      reviews = await this.reviewsService.getReviewsByTarget(TARGET.PRODUCT, action.productId, getState().pageNumberReviews, getState().pageSizeReviews);
      newState = produce(getState(), draft => {
        let currentReviews = draft.reviews;
        draft.reviews = [...currentReviews, ...reviews];
        draft.isFetchingReviewsOverview = false;
        draft.pageNumberReviews = draft.pageNumberReviews + 1;
        draft.endOfListReviews = reviews.length !== draft.pageSizeReviews;
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

  @Action(ProductAverageRatingReviewFetch)
  async productAverageRatingReviewFetch(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductAverageRatingReviewFetch) {
    let newState = produce(getState(), draft => {
      draft.isFetchingReviewsOverview = true;
    });
    setState(newState);

    let averageRating = null;
    try {
      averageRating = await this.reviewsService.getAverageRating(TARGET.PRODUCT, action.productId);
      newState = produce(getState(), draft => {
        draft.averageRating = averageRating;
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

  @Action(ProductAddReview)
  async productAddReview(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ProductAddReview) {

    try {
      let reviewToAdd = {
        targetId: action.productId.toString(),
        ...action.review,
      } satisfies Review;
      await this.reviewsService.addReview(TARGET.PRODUCT, reviewToAdd);
      this.toastrService.success(
        'Your review has been added',
        'Success',
        {icon: ICONS.CHECKMARK_OUTLINE}
      );
      window.location.reload();
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }
    return getState();
  }

  @Action(ProductReset)
  async productReset(
    {setState}: StateContext<ProductStateModel>) {
    return setState(defaultsState);
  };
}
