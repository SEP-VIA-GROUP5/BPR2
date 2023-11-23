import {User} from "src/model/user";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {FetchCurrentUserLoggedIn, FetchUser, UpdateUser} from "src/app/profile/profile.actions";

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
    {getState, setState}: StateContext<ProfileStateModel>
  ){
    // do action fetch user
  }

  @Action(FetchCurrentUserLoggedIn)
  async fetchCurrentUserLoggedIn(
    {getState, setState}: StateContext<ProfileStateModel>,
    action: FetchCurrentUserLoggedIn) {
    // do action fetch current user logged in
  }
}
