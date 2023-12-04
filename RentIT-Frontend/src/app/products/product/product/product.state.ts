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
  ResetSendingInquiry,
  ResetSubmitReport,
  SendingInquiry,
  SubmitReport
} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";
import {ReviewsService} from "src/api/reviews.service";
import {Review, TARGET} from "src/model/review";
import {ReviewSummary} from "src/model/reviewSummary";
import {ReportsService} from "src/api/reports.service";
import {ReportType} from "src/app/products/product/product/constants/constants";
import {ReviewDTO} from "src/model/reviewDTO";
import {InquiryService} from "src/api/inquiry.service";
import {Report} from "src/model/report";

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
  isProductReportAdded: boolean,
  isFetchingReport: boolean;
  // inquiry
  isInquiryAdded: boolean;
  isFetchingInquiry: boolean;
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
  isProductReportAdded: false,
  isFetchingReport: false,
  isInquiryAdded: false,
  isFetchingInquiry: false,
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
    private inquiryService: InquiryService,
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
      setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingProduct = false;
      });
      setState(newState);
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
      reviews = await this.reviewsService.getReviewsByTarget(TARGET.PRODUCT, action.productId.toString(), getState().pageNumberReviews, getState().pageSizeReviews);
      newState = produce(getState(), draft => {
        let currentReviews = draft.reviews;
        draft.reviews = [...currentReviews, ...reviews];
        draft.isFetchingReviewsOverview = false;
        draft.pageNumberReviews = draft.pageNumberReviews + 1;
        draft.endOfListReviews = reviews.length !== draft.pageSizeReviews;
      });
      setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingReviewsOverview = false;
      });
      setState(newState);
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
      reviewSummary = await this.reviewsService.getReviewSummary(TARGET.PRODUCT, action.productId.toString());
      newState = produce(getState(), draft => {
        draft.reviewSummary = reviewSummary;
        draft.isFetchingReviewsOverview = false;
      });
      setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingReviewsOverview = false;
      });
      setState(newState);
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
    setState(newState);

    let targetId = getState().product.product.id;

    // prepare report
    let reportToAdd: Report = {
      ...action.report,
      target: ReportType.PRODUCT,
      targetId: targetId.toString(),
    }

    try {
      await this.reportsService.submitReport(reportToAdd);

      newState = produce(getState(), draft => {
        draft.isProductReportAdded = true;
        draft.isFetchingReport = false;
      });
      return setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isProductReportAdded = false;
        draft.isFetchingReport = false;
      });
      return setState(newState);
    }
  }

  @Action(ResetSubmitReport)
  async resetSubmitReport(
    {getState, setState}: StateContext<ProductStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isProductReportAdded = false;
    });
    return setState(newState);
  }

  @Action(SendingInquiry)
  async sendingInquiry(
    {getState, setState}: StateContext<ProductStateModel>,
    action: SendingInquiry) {
    let newState = produce(getState(), draft => {
      draft.isFetchingInquiry = true;
    });
    setState(newState);

    try {
      let inquiryAdded = await this.inquiryService.addInquiry(action.inquiry);
      newState = produce(getState(), draft => {
        draft.isFetchingInquiry = false;
        draft.isInquiryAdded = !!inquiryAdded;
      });
      return setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetchingInquiry = false;
        draft.isInquiryAdded = false;
      });
      return setState(newState);
    }
  }

  @Action(ResetSendingInquiry)
  async resetSendingInquiry(
    {getState, setState}: StateContext<ProductStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isInquiryAdded = false
    });
    return setState(newState);
  }

  @Action(ProductReset)
  async productReset(
    {setState}: StateContext<ProductStateModel>) {
    return setState(defaultsState);
  };
}
