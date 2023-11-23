import {User} from "src/model/user";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {FetchCurrentUserLoggedIn, FetchUser, ProfileReset, UpdateUser} from "src/app/profile/profile.actions";
import {produce} from "immer";
import {ICONS} from "src/app/constants";

export interface ProfileStateModel {
  isFetching: boolean;
  user: User;
}

export const defaultState: ProfileStateModel = {
  isFetching: false,
  user: null
}

@State<ProfileStateModel>({
  name: 'profilePage',
  defaults: defaultState,
})
@Injectable()
export class ProfileState {
  constructor(
    private userService: UserService,
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
    // do action fetch user
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
      this.toastrService.warning(
        'The account exists or credentials are incorrect',
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
