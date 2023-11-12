import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Product} from "src/model/product";
import {mockedProducts} from "src/mocks/products.mock";
import {ProductOverview} from "src/model/product-overview";
import {Inquiry} from "src/model/inquiry";
import {inquiryMock} from "src/mocks/inquiry.mock";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  constructor(
    private apiService: ApiService<Inquiry>,
  ) {
  }

  PATH_CONTROLLER = 'inquiry';

  async addInquiry(inquiry: Inquiry): Promise<Inquiry> {
    let inquiryAdded = await this.apiService.call(inquiryMock[0], this.apiService.request('post',`${this.PATH_CONTROLLER}`, inquiry, true)) as Inquiry;
    return Promise.resolve(inquiryAdded);
  }
}
