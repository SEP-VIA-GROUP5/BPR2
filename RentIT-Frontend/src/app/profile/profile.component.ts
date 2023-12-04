import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {User} from "src/model/user";
import {ICONS, isEmail, isPassword, isPhoneNumber, SubmitButtonType} from "src/app/constants";
import {
  NbDialogRef,
  NbDialogService,
  NbTabComponent,
  NbToastrService,
  NbTooltipDirective,
  NbWindowRef,
  NbWindowService
} from "@nebular/theme";
import {defaultUserContent, UserContent} from "src/app/authentication/constants/constants";
import {Select, Store} from "@ngxs/store";
import {ProfileSelector} from "src/app/profile/profile.selector";
import {Observable, Subscription} from "rxjs";
import {
  FetchCurrentUserLoggedIn,
  FetchUser,
  FetchUserProducts,
  FetchUserReviews,
  FetchUserSummaryReviews,
  ProfileReset,
  ResetSubmitReport,
  SubmitReport,
  UpdateUser,
  UserAddReview
} from "src/app/profile/profile.actions";
import {Product} from "src/model/product";
import {constructorReportToAdd, ReportToAdd,} from "src/app/products/product/product/constants/constants";
import {UsersInformationTabs} from "src/app/profile/constants/constants";
import {ReviewDTO} from "src/model/reviewDTO";
import {ReviewSummary} from "src/model/reviewSummary";
import {Review} from "src/model/review";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Select(ProfileSelector.isFetching)
  isFetching$: Observable<boolean>;
  @Select(ProfileSelector.userContent)
  userContent$: Observable<UserContent>;
  @Select(ProfileSelector.user)
  user$: Observable<User>;
  @Select(ProfileSelector.userProducts)
  userProducts$: Observable<Product[]>;
  @Select(ProfileSelector.isUserReportAdded)
  isUserReportAdded$: Observable<boolean>;
  @Select(ProfileSelector.isFetchingReport)
  isFetchingReport$: Observable<boolean>;
  @Select(ProfileSelector.userReviews)
  userReviews$: Observable<ReviewDTO[]>;
  @Select(ProfileSelector.userSummaryReviews)
  userSummaryReviews$: Observable<ReviewSummary>;
  @Select(ProfileSelector.pageNumberReviews)
  pageNumberReviews$: Observable<number>;
  @Select(ProfileSelector.pageSizeReviews)
  pageSizeReviews$: Observable<number>;
  @Select(ProfileSelector.endOfListReviews)
  endOfListReviews$: Observable<boolean>;

  profileId: string;
  profileIdSubscription: Subscription;
  userContent: UserContent = defaultUserContent();
  initialUserContent: UserContent = defaultUserContent();
  showPassword = false;
  showRepeatPasswordForm = false;

  // validation
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  @ViewChild('tooltipEmail') tooltipEmail: NbTooltipDirective;
  @ViewChild('tooltipPassword') tooltipPassword: NbTooltipDirective;
  @ViewChild('tooltipPhoneNumber') tooltipPhoneNumber: NbTooltipDirective;

  // location map picker
  @ViewChild('locationChooser') locationChooser: TemplateRef<any>;
  windowRef: NbWindowRef;

  // report
  @ViewChild('reportDialog') reportDialog: TemplateRef<any>;
  private reportDialogRef: NbDialogRef<any>;
  reportToAdd: ReportToAdd = constructorReportToAdd();

  // dialog adding review
  @ViewChild('addRatingDialog') addRatingDialog: TemplateRef<any>;
  private addRatingDialogRef: NbDialogRef<any>;
  reviewToAdd: Review = {
    rating: 0,
    message: '',
  } as Review;

  protected readonly ICONS = ICONS;
  protected readonly UsersInformationTabs = UsersInformationTabs;
  protected readonly SubmitButtonType = SubmitButtonType;
  alive: boolean = true;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              public userService: UserService,
              private toastrService: NbToastrService,
              private nbDialogService: NbDialogService,
              private windowService: NbWindowService) {
  }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.params['id'];
    this.profileIdSubscription = this.activatedRoute.params.subscribe(params => {
      this.profileId = params['id'];
      this.handleProfileIdChange();
    });
  }

  private handleProfileIdChange() {
    let actionInParallel = [];
    if (this.profileId === 'my-profile') {
      if (!this.userService.redirectUserIfNotLoggedIn()) {
        actionInParallel.push(new FetchCurrentUserLoggedIn());
      }
    } else {
      actionInParallel.push(new FetchUser(this.profileId));
    }

    this.store.dispatch([...actionInParallel]).pipe(take(1)).subscribe(() => {
      let userContentSnapshot = this.store.selectSnapshot(ProfileSelector.userContent);
      this.userContent = {...userContentSnapshot};
      this.initialUserContent = {...this.userContent};
      this.store.dispatch(new FetchUserSummaryReviews(this.userContent.email));
    });
  }


  isButtonDisabled() {
    return this.userContent.email === this.initialUserContent.email &&
      this.userContent.firstName === this.initialUserContent.firstName &&
      this.userContent.lastName === this.initialUserContent.lastName &&
      this.userContent.location === this.initialUserContent.location &&
      this.userContent.password === this.initialUserContent.password &&
      this.userContent.phoneNumber === this.initialUserContent.phoneNumber;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onInputType(event) {
    switch (event.target.name) {
      case "email": {
        this.isEmailValid = this.userContent.email !== '' ? isEmail(this.userContent.email) : true;
        break;
      }
      case "repeatPassword":
      case "password": {
        this.isPasswordValid = this.userContent.password === '' || ((this.userContent.password === this.userContent.repeatPassword) && isPassword(this.userContent.password));
        this.showRepeatPasswordForm = this.userContent.password !== this.initialUserContent.password;
        break;
      }
      case "phoneNumber": {
        this.isPhoneNumberValid = this.userContent.phoneNumber !== '' && isPhoneNumber(this.userContent.phoneNumber);
        break;
      }
      case "location": {
        if (this.userContent.location !== '') {
          this.windowRef = this.windowService.open(
            this.locationChooser,
            {
              windowClass: 'window-location',
              title: 'Choose your location',
              context: {location: this.userContent.location}
            },
          );
        }
      }
    }
  }

  onSaveLocation(location: string) {
    this.userContent.location = location;
    this.windowRef.close();
    this.toastrService.info('Location saved successfully!', 'Success', {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE});
  }

  showTooltipForInputs() {
    if (!this.isEmailValid) {
      this.tooltipEmail.show();
    } else if (!this.isPasswordValid) {
      this.tooltipPassword.show();
    } else if (!this.isPhoneNumberValid) {
      this.tooltipPhoneNumber.show();
    }
  }

  hideTooltipForInputs() {
    if (this.isEmailValid) {
      this.tooltipEmail.hide();
    } else if (this.isPasswordValid) {
      this.tooltipPassword.hide();
    } else if (this.isPhoneNumberValid) {
      this.tooltipPhoneNumber.hide();
    }
  }

  showTooltipForReportButton(): string {
    if (!this.userService.isLoggedIn()) {
      return 'You need to be logged-in in order to report a user';
    } else if (this.canDisplayCurrentUserProfile()) {
      return 'You cannot report yourself';
    } else {
      return 'Report this user? Click here!';
    }
  }

  isReportButtonDisabled() {
    if (this.userService.isLoggedIn()) {
      return this.canDisplayCurrentUserProfile();
    }
    console.log('works');
    return true;
  }

  onFormSubmit() {
    this.store.dispatch(new UpdateUser(this.userContent));
  }

  getProductGridClass(products: Product[]): string {
    if (products.length >= 1 && products.length <= 3) {
      return 'limited-products';
    }
    return '';
  }

  openReportDialog() {
    this.reportDialogRef = this.nbDialogService.open(this.reportDialog);
  }

  isOnSubmitButtonDisabled(submitButtonType: SubmitButtonType): boolean {
    if (submitButtonType === SubmitButtonType.REPORT) {
      return this.reportToAdd.userReport.message === '' || this.reportToAdd.userReport.message.length > 500;
    } else if (submitButtonType === SubmitButtonType.ADD_REVIEW) {
      return this.reviewToAdd.rating === 0 || this.reviewToAdd.message === '';
    }
  }

  getCharactersReportMessage() {
    return `${this.reportToAdd.userReport.message.length} / 500`;
  }


  onSubmitReportButtonClicked(submitButtonType: SubmitButtonType) {
    if (submitButtonType === SubmitButtonType.ADD_REVIEW) {
      this.store.dispatch(new UserAddReview(this.userContent.email, this.reviewToAdd));
      this.addRatingDialogRef.close();
    } else if (submitButtonType === SubmitButtonType.REPORT) {
      let report = this.reportToAdd.userReport;
      this.store.dispatch(new SubmitReport(report));
    }
  }

  resetReport() {
    this.reportToAdd.userReport = constructorReportToAdd().userReport;
    this.store.dispatch(new ResetSubmitReport());
  }

  closeReportDialog() {
    this.reportDialogRef.close();
  }

  canDisplayCurrentUserProfile() {
    return this.profileId === 'my-profile' || (this.userService.isLoggedIn() && this.userContent.email === this.userService.getUser().email);
  }

  onTabChanged(event: NbTabComponent) {
    switch (event.tabId) {
      case UsersInformationTabs.PRODUCTS: {
        this.store.dispatch(new FetchUserProducts(this.profileId));
        break;
      }
      case UsersInformationTabs.REVIEWS: {
        let userContentSnapshot = this.store.selectSnapshot(ProfileSelector.userContent);
        this.store.dispatch(new FetchUserReviews(userContentSnapshot.email));
        break;
      }
    }
  }

  openAddReviewDialog() {
    this.addRatingDialogRef = this.nbDialogService.open(this.addRatingDialog, {});
  }

  onAddingReviewClickOnStar(starsNumber: number) {
    this.reviewToAdd.rating = starsNumber;
  }

  loadNextReviews() {
    this.store.dispatch(new FetchUserReviews(this.userContent.email));
  }

  ngOnDestroy() {
    this.profileIdSubscription.unsubscribe();
    this.store.dispatch(new ProfileReset());
    this.alive = false;
  }
}
