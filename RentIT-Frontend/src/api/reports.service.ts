import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {mockedReviews} from "src/mocks/reviews.mock";
import {Report} from "src/model/report";
import {ResponseMessage} from "src/model/responseMessage";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(
    private apiService: ApiService<Report[] | Report | ResponseMessage>,
  ) {
  }

  PATH_CONTROLLER = 'report';

  async submitReport(report: Report): Promise<ResponseMessage> {
    return await this.apiService.call(mockedReviews, this.apiService.request('post', `${this.PATH_CONTROLLER}/${report.target}/${report.targetId}`, report.message, false)) as ResponseMessage;
  }
}
