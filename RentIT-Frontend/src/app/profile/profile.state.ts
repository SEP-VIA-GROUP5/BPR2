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
  UpdateUser
} from "src/app/profile/profile.actions";
import {produce} from "immer";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {Product} from "src/model/product";
import {ProductsService} from "src/api/products.service";

export interface ProfileStateModel {
  isFetching: boolean;
  user: User;
  userProducts: Product[];
}

export const defaultState: ProfileStateModel = {
  isFetching: false,
  user: null,
  userProducts: [],
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
  ) {
  }

  @Action(UpdateUser)
  async updateUser(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: UpdateUser
  ) {
    // do action update user
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
  async fetchCurrentUserLoggedIn(
    {getState, setState}: StateContext<ProfileStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    let user: User;
    try {
      user = await this.userService.getUser();
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
    }
    catch (error) {
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

  @Action(ProfileReset)
  async profileReset(
    {getState, setState}: StateContext<ProfileStateModel>) {
    setState(defaultState);
  }
}