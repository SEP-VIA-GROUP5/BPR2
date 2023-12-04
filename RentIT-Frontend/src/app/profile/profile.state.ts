import {User} from "src/model/user";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
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
import {produce} from "immer";
import {ICONS, LocalStorageEnum} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {Product} from "src/model/product";
import {ProductsService} from "src/api/products.service";
import {Report} from "src/model/report";
import {ReportType} from "src/app/products/product/product/constants/constants";
import {ReportsService} from "src/api/reports.service";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ReviewsService} from "src/api/reviews.service";
import {Review, TARGET} from "src/model/review";
import {ReviewSummary} from "src/model/reviewSummary";
import {ReviewDTO} from "src/model/reviewDTO";

export interface ProfileStateModel {
  isFetching: boolean;
  user: User;
  userProducts: Product[];
  isUserReportAdded: boolean;
  isFetchingReport: boolean;
  userReviews: ReviewDTO[],
  userSummaryReviews: ReviewSummary,
  pageNumberReviews: number,
  pageSizeReviews: number,
  endOfListReviews: boolean,
}

export const defaultState: ProfileStateModel = {
  isFetching: false,
  user: null,
  userProducts: [],
  isUserReportAdded: false,
  isFetchingReport: false,
  userReviews: [],
  userSummaryReviews: null,
  pageNumberReviews: 1,
  pageSizeReviews: 5,
  endOfListReviews: false,
}

@State<ProfileStateModel>({
  name: 'profilePage',
  defaults: defaultState,
})
@Injectable()
export class ProfileState {
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private toastrService: NbToastrService,
    private reportsService: ReportsService,
    private localStorageService: LocalStorageService,
    private reviewsService: ReviewsService,
  ) {
  }

  @Action(UpdateUser)
  async updateUser(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: UpdateUser
  ) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let updatedUser: User;
    try {

      const changedUser = {
        email: action.user.email,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        location: action.user.location,
        phoneNumber: action.user.phoneNumber,
        password: action.user.password,
      } satisfies User;
      updatedUser = await this.userService.updateUser(changedUser);
      this.localStorageService.saveData(LocalStorageEnum.USER, JSON.stringify(updatedUser));
      newState = produce(getState(), draft => {
        draft.user = updatedUser;
        draft.isFetching = false;
      });
      setState(newState);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(FetchUser)
  async fetchUser(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: FetchUser
  ) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let user: User;
    try {
      user = await this.userService.getUserByEmail(action.email);
      newState = produce(getState(), draft => {
        draft.user = user;
        draft.isFetching = false;
      });
      setState(newState);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(FetchCurrentUserLoggedIn)
  fetchCurrentUserLoggedIn(
    {getState, setState, dispatch}: StateContext<ProfileStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let user: User;
    try {
      user = this.userService.getUser();
      newState = produce(getState(), draft => {
        draft.user = user;
        draft.isFetching = false;
      });
      setState(newState);
      dispatch(new FetchUserSummaryReviews(user.email));
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(FetchUserProducts)
  async fetchUserProducts(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: FetchUserProducts) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let products: Product[];
    try {
      products = await this.productsService.getProductsByUserEmail(action.email);
      newState = produce(getState(), draft => {
        draft.userProducts = products;
        draft.isFetching = false;
      });
      setState(newState);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(SubmitReport)
  async submitReport(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: SubmitReport) {
    let newState = produce(getState(), draft => {
      draft.isFetchingReport = true;
    });
    setState(newState);

    let targetId = getState().user.email;

    // prepare report
    let reportToAdd: Report = {
      ...action.report,
      target: ReportType.USER,
      targetId: targetId.toString(),
    }

    try {
      await this.reportsService.submitReport(reportToAdd);

      newState = produce(getState(), draft => {
        draft.isUserReportAdded = true;
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
        draft.isUserReportAdded = false;
        draft.isFetchingReport = false;
      });
      return setState(newState);
    }
  }

  @Action(ResetSubmitReport)
  async resetSubmitReport(
    {getState, setState}: StateContext<ProfileStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isUserReportAdded = false;
    });
    return setState(newState);
  }

  @Action(FetchUserReviews)
  async fetchUserReviews(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: FetchUserReviews) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let reviews: ReviewDTO[];
    try {
      reviews = await this.reviewsService.getReviewsByTarget(TARGET.USER, action.email, getState().pageNumberReviews, getState().pageSizeReviews);
      newState = produce(getState(), draft => {
        let currentReviews = draft.userReviews;
        draft.userReviews = [...currentReviews, ...reviews];
        draft.isFetching = false;
        draft.pageNumberReviews = draft.pageNumberReviews + 1;
        draft.endOfListReviews = reviews.length !== draft.pageSizeReviews;
      });
      setState(newState);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(FetchUserSummaryReviews)
  async fetchUserSummaryReviews(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: FetchUserSummaryReviews) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let reviewSummary: ReviewSummary;
    try {
      reviewSummary = await this.reviewsService.getReviewSummary(TARGET.USER, action.email);
      newState = produce(getState(), draft => {
        draft.userSummaryReviews = reviewSummary;
        draft.isFetching = false;
      });
      setState(newState);
    } catch (error) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      setState(newState);
    }
  }

  @Action(UserAddReview)
  async userAddReview(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: UserAddReview) {

    try {
      let reviewToAdd = {
        targetId: action.email,
        ...action.review,
      } satisfies Review;
      await this.reviewsService.addReview(TARGET.USER, reviewToAdd);
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

  @Action(ProfileReset)
  async profileReset(
    {setState}: StateContext<ProfileStateModel>) {
    setState(defaultState);
  }
}
