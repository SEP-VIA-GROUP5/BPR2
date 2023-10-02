import {Selector} from "@ngxs/store";
import { AuthenticationState, AuthenticationStateModel } from "src/app/authentication/authentication.state";

export class AuthenticationSelector {
  @Selector([AuthenticationState])
  static isFetching(state: AuthenticationStateModel) {
    return state.isFetching;
  }
}
