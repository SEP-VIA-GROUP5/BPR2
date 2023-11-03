import {Review} from "src/model/review";
import {Report} from "src/model/report";
import {ReportType} from "src/app/products/product/product/constants/constants";

export class ProductFetch {
  static readonly type = '[Product] Fetch';
  constructor(public productId: number){
  }
}

export class ProductReviewsFetch {
  static readonly type = '[Product] Reviews Fetch';
  constructor(public productId: number){
  }
}

export class ProductAverageRatingReviewFetch {
  static readonly type = '[Product] Average Rating Fetch';
  constructor(public productId: number){
  }
}

export class ProductAddReview {
  static readonly type = '[Product] Add Review';
  constructor(public productId: number, public review: Review){
  }
}

export class SubmitReport {
  static readonly type = '[Product] Submit Report';
  constructor(public report: Report, public reportType: ReportType){
  }
}

export class ResetSubmitReport {
  static readonly type = '[Product] Reset Submit Report';
  constructor(public reportType: ReportType) {
  }
}

export class ProductReset {
  static readonly type = '[Product] Reset';
  constructor() {
  }
}

