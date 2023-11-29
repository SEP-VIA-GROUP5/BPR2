import {User} from "src/model/user";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {
  FetchCurrentUserLoggedIn,
  FetchUser,
  FetchUserProducts,
  ProfileReset,
  ResetSubmitReport,
  SubmitReport,
  UpdateUser
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

export interface ProfileStateModel {
  isFetching: boolean;
  user: User;
  userProducts: Product[];
  isUserReportAdded: boolean;
  isFetchingReport: boolean;
}

export const defaultState: ProfileStateModel = {
  isFetching: false,
  user: null,
  userProducts: [],
  isUserReportAdded: false,
  isFetchingReport: false,
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
    {getState, setState}: StateContext<ProfileStateModel>) {
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

  @Action(ProfileReset)
  async profileReset(
    {setState}: StateContext<ProfileStateModel>) {
    setState(defaultState);
  }
}
