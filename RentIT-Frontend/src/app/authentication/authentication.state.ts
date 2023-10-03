import {Action, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {Login, Logout, Register} from "src/app/authentication/authentication.actions";
import {UserService} from "src/api/user.service";
import {User} from "src/model/user";
import {ICONS} from "src/app/constants";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";

export interface AuthenticationStateModel {
  isFetching: boolean;
  statusCode: number;
}

export const defaultsState: AuthenticationStateModel = {
  isFetching: false,
  // no status
  statusCode: 0
}

@State<AuthenticationStateModel>({
  name: 'authenticationPage',
  defaults: defaultsState,
})

@Injectable()
export class AuthenticationState {
  constructor(
    private userService: UserService,
    private toastrService: NbToastrService,
    private store: Store,
    private router: Router,
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

    try {
      await this.userService.register(user);
    } catch (error) {
      if (error.status === 401) {
        this.toastrService.warning(
          'The account exists or credentials are incorrect',
          'Something went wrong',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      } else {
        // TODO handle other errors global method
      }
      newState = produce(getState(), draft => {
        draft.statusCode = error.status;
      })
      setState(newState);
    }

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
      draft.statusCode = 0;
    })
    setState(newState);

    let user = {
      ...action.user
    } as User;

    try {
      await this.userService.login(user);
    } catch (error) {
      if (error.status === 401) {
        this.toastrService.warning(
          'The account does not exist or credentials are incorrect',
          'Something went wrong',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      } else {
        // TODO handle other errors global method
      }
      newState = produce(getState(), draft => {
        draft.statusCode = error.status;
      })
      setState(newState);
    }


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
