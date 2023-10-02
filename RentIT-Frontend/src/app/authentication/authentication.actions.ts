import {UserContent} from "src/app/authentication/constants/constants";

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public user: UserContent) {
  }
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public user: UserContent) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {
  }
}
