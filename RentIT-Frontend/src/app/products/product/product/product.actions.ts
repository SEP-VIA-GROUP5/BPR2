import {Review} from "src/model/review";

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

export class ProductReset {
  static readonly type = '[Product] Reset';
  constructor() {
  }
}

