import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Review, TARGET} from "src/model/review";
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

  // target can be user or product
  async getReviewsByTarget(target: TARGET, targetId: number, pageNum: number, pageSize: number): Promise<Review[]> {
    return await this.apiService.call(mockedReviews, this.apiService.request('get', `${this.PATH_CONTROLLER}/${target}/page/${targetId}/${pageNum}/${pageSize}`, null, false)) as Review[];
  }

  async getAverageRating(target: TARGET, targetId: number): Promise<number> {
    return this.apiService.call(4.5, this.apiService.request('get', `${this.PATH_CONTROLLER}/summary/${target}/${targetId}`, null, false)) as Promise<number>;
  }

  async addReview(target: TARGET, review: Review) {
    return this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/${target}`, review, true)) as Promise<Review>;
  }
}
