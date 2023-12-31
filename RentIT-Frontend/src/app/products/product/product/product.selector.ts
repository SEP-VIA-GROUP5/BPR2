import {Selector} from "@ngxs/store";
import {ProductState, ProductStateModel} from "src/app/products/product/product/product.state";

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

  @Selector([ProductState])
  static isFetchingReport(state: ProductStateModel) {
    return state.isFetchingReport;
  }

  @Selector([ProductState])
  static isProductReportAdded(state: ProductStateModel) {
    return state.isProductReportAdded;
  }

  @Selector([ProductState])
  static isFetchingInquiry(state: ProductStateModel) {
    return state.isFetchingInquiry;
  }

  @Selector([ProductState])
  static isInquiryAdded(state: ProductStateModel) {
    return state.isInquiryAdded;
  }
}
