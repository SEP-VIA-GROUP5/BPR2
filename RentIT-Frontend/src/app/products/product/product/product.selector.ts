import {Selector} from "@ngxs/store";
import {ProductState, ProductStateModel} from "src/app/products/product/product/product.state";
import {Review} from "src/model/review";
import {User} from "src/model/user";

export class ProductSelector {
  @Selector([ProductState])
  static isFetchingProduct(state: ProductStateModel) {
    return state.isFetchingProduct;
  }

  @Selector([ProductState])
  static product(state: ProductStateModel) {
    return state.product;
  }

  @Selector([ProductState])
  static isFetchingReviewsOverview(state: ProductStateModel) {
    return state.isFetchingReviewsOverview;
  }

  @Selector([ProductState])
  static reviews(state: ProductStateModel) {
    return state.reviews;
  }

  @Selector([ProductState])
  static reviewSummary(state: ProductStateModel) {
    return state.reviewSummary;
  }

  @Selector([ProductState])
  static endOfListReviews(state: ProductStateModel) {
    return state.endOfListReviews;
  }
}
