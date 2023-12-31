import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ICONS, isEmail, isPhoneNumber, SubmitButtonType} from "src/app/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ProductSelector} from "src/app/products/product/product/product.selector";
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
import {ProductStatus} from "src/model/productStatus";
import {HumanizeDuration, HumanizeDurationLanguage} from 'humanize-duration-ts';
import {NbDialogRef, NbDialogService} from "@nebular/theme";
import {Review} from "src/model/review";
import {UserService} from "src/api/user.service";
import {ReviewSummary} from "src/model/reviewSummary";
import {
  ButtonType,
  constructorReportToAdd,
  constructorSendingInquiry,
  ReportToAdd,
} from "src/app/products/product/product/constants/constants";
import {ReviewDTO} from "src/model/reviewDTO";
import {Inquiry} from "src/model/inquiry";
import {addDays, toUTCDate} from "src/core/utils/date.utils";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Select(ProductSelector.isFetchingProduct)
  isFetchingProduct$: Observable<boolean>;
  @Select(ProductSelector.isFetchingReviewsOverview)
  isFetchingReviewsOverview$: Observable<boolean>;
  @Select(ProductSelector.product)
  product$: Observable<ProductOverview>;
  @Select(ProductSelector.reviews)
  reviews$: Observable<ReviewDTO[]>;
  @Select(ProductSelector.reviewSummary)
  reviewSummary$: Observable<ReviewSummary>;
  @Select(ProductSelector.endOfListReviews)
  endOfListReviews$: Observable<boolean>;
  @Select(ProductSelector.isFetchingReport)
  isFetchingReport$: Observable<boolean>;
  @Select(ProductSelector.isProductReportAdded)
  isProductReportAdded$: Observable<boolean>;
  @Select(ProductSelector.isFetchingInquiry)
  isFetchingInquiry$: Observable<boolean>;
  @Select(ProductSelector.isInquiryAdded)
  isInquiryAdded$: Observable<boolean>;

  // dialog sending inquiry
  @ViewChild('sendInquiryDialog') sendInquiryDialog: TemplateRef<any>;
  private sendInquiryDialogRef: NbDialogRef<any>;
  inquiryToSend: Inquiry = {
    ...constructorSendingInquiry(),
  };
  isPhoneNumberInquiryValid: boolean = true;
  isEmailInquiryValid: boolean = true;
  minimumFromRentingDate: Date;
  minimumToRentingDate: Date;

  // dialog adding review
  @ViewChild('addRatingDialog') addRatingDialog: TemplateRef<any>;
  private addRatingDialogRef: NbDialogRef<any>;
  reviewToAdd: Review = {
    rating: 0,
    message: '',
  } as Review;

  // dialog report user/rating
  @ViewChild('reportDialog') reportDialog: TemplateRef<any>;
  private reportDialogRef: NbDialogRef<any>;
  reportToAdd: ReportToAdd = constructorReportToAdd();

  productId: number;
  // constants
  protected readonly ICONS = ICONS;
  protected readonly SubmitButtonType = SubmitButtonType;
  protected readonly ProductStatus = ProductStatus;
  protected readonly ButtonType = ButtonType;

  alive: boolean = true;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private router: Router,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    let actionsInParallel = [];
    this.productId = this.activatedRoute.snapshot.params['productId'];

    this.inquiryToSend = {
      ...this.inquiryToSend,
      productId: this.productId,
    } satisfies Inquiry;

    actionsInParallel.push(
      new ProductFetch(this.productId),
      new ProductReviewsFetch(this.productId),
      new ProductAverageRatingReviewFetch(this.productId));
    this.store.dispatch([...actionsInParallel]);
  }

  getProductInfoStatusBadge(productStatus: ProductStatus) {
    switch (productStatus) {
      case ProductStatus.AVAILABLE:
        return 'Available';
      case ProductStatus.UNAVAILABLE:
        return 'Unavailable';
      case ProductStatus.PAUSED:
        return 'Paused';
      case ProductStatus.RENTED:
        return 'Rented';
    }
  }

  getProductStatusColorBadge(productStatus: ProductStatus) {
    switch (productStatus) {
      case ProductStatus.AVAILABLE:
        return 'success';
      case ProductStatus.RENTED:
      case ProductStatus.UNAVAILABLE:
        return 'danger';
      case ProductStatus.PAUSED:
        return 'warning';
    }
  }

  clickOnStarEvent() {
    // goes to add review button page
    let addReviewButtonElement = document.getElementById('addReviewButton');
    addReviewButtonElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  onAddingReviewClickOnStar(starsNumber: number) {
    this.reviewToAdd.rating = starsNumber;
  }

  openReportDialog() {
    this.reportDialogRef = this.nbDialogService.open(this.reportDialog);
  }

  openAddReviewDialog() {
    this.addRatingDialogRef = this.nbDialogService.open(this.addRatingDialog, {});
  }

  onSubmitReportButtonClicked(submitButtonType: SubmitButtonType) {
    if (submitButtonType === SubmitButtonType.ADD_REVIEW) {
      this.store.dispatch(new ProductAddReview(this.productId, this.reviewToAdd));
      this.addRatingDialogRef.close();
    } else if (submitButtonType === SubmitButtonType.REPORT) {
      let report = this.reportToAdd.productReport;
      this.store.dispatch(new SubmitReport(report));
    }
  }

  isOnSubmitButtonDisabled(submitButtonType: SubmitButtonType): boolean {
    if (submitButtonType === SubmitButtonType.ADD_REVIEW) {
      return this.reviewToAdd.rating === 0 || this.reviewToAdd.message === '';
    } else if (submitButtonType === SubmitButtonType.REPORT) {
      return this.reportToAdd.productReport.message === '' || this.reportToAdd.productReport.message.length > 500;
    }
  }

  getCharactersReportMessage() {
    return `${this.reportToAdd.productReport.message.length} / 500`;
  }

  resetReport() {
    this.reportToAdd.productReport = constructorReportToAdd().productReport;
    this.store.dispatch(new ResetSubmitReport());
  }

  closeReportDialog() {
    this.reportDialogRef.close();
  }

  openSendInquiryDialog() {
    this.minimumFromRentingDate = toUTCDate(new Date());
    this.minimumToRentingDate = toUTCDate(addDays(new Date(), 1));
    this.inquiryToSend = {
      ...this.inquiryToSend,
    }
    let product: ProductOverview = this.store.selectSnapshot(ProductSelector.product);
    this.sendInquiryDialogRef = this.nbDialogService.open(this.sendInquiryDialog, {
      context: {
        product: product,
      }
    });
  }

  onInquiryInputType(event) {
    switch (event.target.name) {
      case "senderPhoneNumber" : {
        if (event.target.value || event.target.value.length > 0) {
          this.isPhoneNumberInquiryValid = isPhoneNumber(event.target.value);
        } else if (event.target.value === '') {
          this.isPhoneNumberInquiryValid = true;
        }
        break;
      }
      case "senderEmail" : {
        if (event.target.value || event.target.value.length > 0) {
          this.isEmailInquiryValid = isEmail(event.target.value);
        } else if (event.target.value === '') {
          this.isEmailInquiryValid = true;
        }
        break;
      }
    }
  }

  getCharactersInquiryMessage() {
    return `${this.inquiryToSend.message.length} / 500`;
  }

  isOnSubmitInquiryButtonDisabled() {
    return this.inquiryToSend.message === '' || this.inquiryToSend.message.length > 500 || !this.isEmailInquiryValid || !this.isPhoneNumberInquiryValid || this.inquiryToSend.rentEnd === null || this.inquiryToSend.rentStart === null
  }

  onSubmitInquiryButtonClicked() {
    this.store.dispatch(new SendingInquiry(this.inquiryToSend));
  }

  onCloseInquiryDialog() {
    this.sendInquiryDialogRef.close();
  }

  onResetInquiryDialog() {
    this.inquiryToSend = {
      ...constructorSendingInquiry(),
      productId: this.productId,
    } satisfies Inquiry;

    this.store.dispatch(new ResetSendingInquiry());
  }

  humanizeDurationMinLeasePeriod(minLeasePeriod: number) {
    const humanizer = new HumanizeDuration(new HumanizeDurationLanguage());
    return humanizer.humanize(minLeasePeriod * 24 * 60 * 60 * 1000);
  }

  loadNextReviews() {
    this.store.dispatch(new ProductReviewsFetch(this.productId));
  }

  navigateToUsersProfile(email: string) {
    this.router.navigate([`/profile/${email}`]);
  }

  canShowButton() {
    if (this.userService.isLoggedIn()) {
      return this.userService.getUser().email !== this.store.selectSnapshot(ProductSelector.product).user.email;
    }
    return false;
  }

  getButtonTooltip(buttonType: ButtonType): string {
    const article = buttonType === ButtonType.INQUIRY ? 'an' : 'a';
    if (this.userService.isLoggedIn()) {
      if (this.userService.getUser().email === this.store.selectSnapshot(ProductSelector.product).user.email) {
        return `You cannot send ${article} ${buttonType} to yourself`;
      }
      return `Send ${article} ${buttonType} to the owner of this product`;
    }
    return `You must be logged in to send ${article} ${buttonType}`;
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new ProductReset());
  }
}
