import {UserContent} from "src/app/authentication/constants/constants";

export class FetchCurrentUserLoggedIn {
  static readonly type = '[Profile] Fetch current user logged in';

  constructor() {
  }
}

export class FetchUser {
  static readonly type = '[Profile] Fetch user';

  constructor(public email: string) {
  }
}

export class UpdateUser {
  static readonly type = '[Profile] Update user';

  constructor(public user: UserContent) {
  }
}

export class FetchUserProducts {
  static readonly type = '[Profile] Fetch user products';

  constructor(public email: string) {
  }
}

export class ProfileReset {
  static readonly type = '[Profile] Reset';

  constructor() {
  }
}
