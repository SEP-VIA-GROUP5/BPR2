import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Report} from "src/model/report";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(
    private apiService: ApiService<void>,
  ) {
  }

  PATH_CONTROLLER = 'report';

  async submitReport(report: Report): Promise<void> {
    return await this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/${report.target}/${report.targetId}`, report.message, true));
  }
}
