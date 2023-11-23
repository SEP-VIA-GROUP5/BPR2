import {Selector} from "@ngxs/store";
import {ProfileState, ProfileStateModel} from "src/app/profile/profile.state";
import {UserContent} from "src/app/authentication/constants/constants";

export class ProfileSelector {
  @Selector([ProfileState])
  static isFetching(state: ProfileStateModel) {
    return state.isFetching;
  }

  @Selector([ProfileState])
  static user(state: ProfileStateModel) {
    return state.user;
  }

  @Selector([ProfileState])
  static userProducts(state: ProfileStateModel) {
    return state.userProducts;
  }

  @Selector([ProfileState])
  static userContent(state: ProfileStateModel) {
    return {
      email: state.user.email,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      location: state.user.location,
      phoneNumber: state.user.phoneNumber,
      password: '',
      repeatPassword: '',
    } as UserContent;
  }
}
