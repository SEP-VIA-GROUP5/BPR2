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
  ProductReviewsFetch,
  ResetSubmitReport,
  SubmitReport
} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";
import {ReviewsService} from "src/api/reviews.service";
import {Review, TARGET} from "src/model/review";
import {ReviewSummary} from "src/model/reviewSummary";
import {ReportsService} from "src/api/reports.service";
import {ReportType} from "src/app/products/product/product/constants/constants";
import {ResponseMessage} from "src/model/responseMessage";
import {ReviewDTO} from "src/model/reviewDTO";

export interface ProductStateModel {
  // product
  isFetchingProduct: boolean;
  product: ProductOverview;
  // reviews
  isFetchingReviewsOverview: boolean;
  reviews: ReviewDTO[];
  reviewSummary: ReviewSummary;
  pageSizeReviews: number;
  pageNumberReviews: number;
  endOfListReviews: boolean;
  // report
  isUserReportAdded: boolean;
  isProductReportAdded: boolean,
  isFetchingReport: boolean;
}

export const defaultsState: ProductStateModel = {
  isFetchingProduct: false,
  product: null,
  isFetchingReviewsOverview: false,
  reviews: [],
  reviewSummary: null,
  pageSizeReviews: 5,
  pageNumberReviews: 1,
  endOfListReviews: false,
  isUserReportAdded: false,
  isProductReportAdded: false,
  isFetchingReport: false,
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
    private reportsService: ReportsService,
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

    let reviewSummary = null;
    try {
      reviewSummary = await this.reviewsService.getReviewSummary(TARGET.PRODUCT, action.productId);
      newState = produce(getState(), draft => {
        draft.reviewSummary = reviewSummary;
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

  @Action(SubmitReport)
  async submitReport(
    {getState, setState}: StateContext<ProductStateModel>,
    action: SubmitReport) {
    let newState = produce(getState(), draft => {
      draft.isFetchingReport = true;
    });

    let targetId = null;
    if (action.reportType === ReportType.PRODUCT) {
      targetId = getState().product.product.id;
    } else if (action.reportType === ReportType.USER) {
      targetId = getState().product.user.email;
    }

    // prepare report
    let reportToAdd = {
      ...action.report,
      target: action.reportType,
      targetId: targetId,
    }

    try {
      let responseMessage = await this.reportsService.submitReport(reportToAdd);

      // handle responseMessage
      switch (responseMessage) {
        case ResponseMessage.SUCCESS: {
          newState = produce(getState(), draft => {
            if (action.reportType === ReportType.PRODUCT) {
              draft.isProductReportAdded = true;
            }
            else if (action.reportType === ReportType.USER) {
              draft.isUserReportAdded = true;
            }
            draft.isFetchingReport = false;
          });
          return setState(newState);
        }
        case ResponseMessage.INVALID_USER:
        case ResponseMessage.INVALID_PARAMETERS: {
          this.toastrService.danger(
            `Reason: ${responseMessage}`,
            'Something went wrong',
            {icon: ICONS.ALERT_CIRCLE_OUTLINE}
          )
          newState = produce(getState(), draft => {
            if (action.reportType === ReportType.PRODUCT) {
              draft.isProductReportAdded = false;
            }
            else if (action.reportType === ReportType.USER) {
              draft.isUserReportAdded = false;
            }
            draft.isFetchingReport = false;
          });
          return setState(newState);
        }
      }
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        if (action.reportType === ReportType.PRODUCT) {
          draft.isProductReportAdded = false;
        }
        else if (action.reportType === ReportType.USER) {
          draft.isUserReportAdded = false;
        }
        draft.isFetchingReport = false;
      });
      return setState(newState);
    }
  }

  @Action(ResetSubmitReport)
  async resetSubmitReport(
    {getState, setState}: StateContext<ProductStateModel>,
    action: ResetSubmitReport) {
    let newState = produce(getState(), draft => {
      if(action.reportType === ReportType.PRODUCT) {
        draft.isProductReportAdded = false;
      }
      else if(action.reportType === ReportType.USER) {
        draft.isUserReportAdded = false;
      }
    });
    return setState(newState);
  }

  @Action(ProductReset)
  async productReset(
    {setState}: StateContext<ProductStateModel>) {
    return setState(defaultsState);
  };
}
