import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Review} from "src/model/review";
import {mockedReviews} from "src/mocks/reviews.mock";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(
    private apiService: ApiService<Review[] | Review | number>,
  ) {
  }

  PATH_CONTROLLER = 'review';

  async getReviewsOverview(productId: number): Promise<Review[]> {
    // TODO comment this for now as there's no endpoint for this
    // let reviewsOverview = await this.apiService.call(mockedReviewOverviews, this.apiService.request('get',`${this.PATH_CONTROLLER}/reviews/id/${productId}`, null, false)) as ReviewsOverview;
    // return Promise.resolve(reviewsOverview);
    return Promise.resolve(mockedReviews);
  }
}
