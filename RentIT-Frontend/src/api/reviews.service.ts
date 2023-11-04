import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Review, TARGET} from "src/model/review";
import {mockedReviews} from "src/mocks/reviews.mock";
import {ReviewSummary} from "src/model/reviewSummary";
import {mockedReviewSummaries} from "src/mocks/reviewSummary.mock";
import {ReviewDTO} from "src/model/reviewDTO";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(
    private apiService: ApiService<ReviewDTO[] | Review | ReviewSummary>,
  ) {
  }

  PATH_CONTROLLER = 'review';

  // target can be user or product
  async getReviewsByTarget(target: TARGET, targetId: number, pageNum: number, pageSize: number): Promise<ReviewDTO[]> {
    return await this.apiService.call(mockedReviews, this.apiService.request('get', `${this.PATH_CONTROLLER}/${target}/page/${targetId}/${pageNum}/${pageSize}`, null, false)) as ReviewDTO[];
  }

  async getReviewSummary(target: TARGET, targetId: number): Promise<ReviewSummary> {
    return this.apiService.call(mockedReviewSummaries[0], this.apiService.request('get', `${this.PATH_CONTROLLER}/summary/${target}/${targetId}`, null, false)) as Promise<ReviewSummary>;
  }

  async addReview(target: TARGET, review: Review) {
    return this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/${target}`, review, true)) as Promise<Review>;
  }
}
