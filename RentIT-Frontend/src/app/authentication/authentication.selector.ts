import {Selector} from "@ngxs/store";
import {AppState, AuthenticationStateModel} from "src/app/authentication/authentication.state";

export class AuthenticationSelector {
  @Selector([AppState])
  static isFetching(state: AuthenticationStateModel) {
    return state.isFetching;
  }
}
