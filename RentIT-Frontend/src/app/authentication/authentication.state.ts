import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {Login, Logout, Register} from "src/app/authentication/authentication.actions";
import {UserService} from "src/api/user.service";
import {User} from "src/model/user";

export interface AuthenticationStateModel {
  isFetching: boolean;
}

export const defaultsState: AuthenticationStateModel = {
  isFetching: false,
}

@State<AuthenticationStateModel>({
  name: 'appPage',
  defaults: defaultsState,
})

@Injectable()
export class AuthenticationState {
  constructor(
    private userService: UserService
  ) {
  }

  @Action(Register)
  async register(
    {getState, setState}: StateContext<AuthenticationStateModel>,
    action: Register) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let user = {
      ...action.user
    } as User;

    await this.userService.register(user);

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(Login)
  async login(
    {getState, setState}: StateContext<AuthenticationStateModel>,
    action: Login) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let user = {
      ...action.user
    } as User;

    await this.userService.login(user);

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(Logout)
  async logout(
    {getState, setState}: StateContext<AuthenticationStateModel>) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);
    this.userService.logout();

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    })
    setState(newState);
  }
}
