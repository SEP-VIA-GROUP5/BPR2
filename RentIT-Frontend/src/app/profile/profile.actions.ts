import {UserContent} from "src/app/authentication/constants/constants";
import {Report} from "src/model/report";
import {Review} from "src/model/review";

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

export class SubmitReport {
  static readonly type = '[Profile] Submit Report';

  constructor(public report: Report) {
  }
}

export class ResetSubmitReport {
  static readonly type = '[Profile] Reset Submit Report';

  constructor() {
  }
}

export class FetchUserReviews {
  static readonly type = '[Profile] Fetch user reviews';

  constructor(public email: string) {
  }
}

export class FetchUserSummaryReviews {
  static readonly type = '[Profile] Fetch user summary reviews';

  constructor(public email: string) {
  }
}

export class UserAddReview {
  static readonly type = '[Profile] Add Review';

  constructor(public email: string, public review: Review) {
  }
}

export class ProfileReset {
  static readonly type = '[Profile] Reset';

  constructor() {
  }
}
