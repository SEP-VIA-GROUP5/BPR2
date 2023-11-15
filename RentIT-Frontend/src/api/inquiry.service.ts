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
    private apiService: ApiService<Inquiry | Inquiry[]>,
  ) {
  }

  PATH_CONTROLLER = 'inquiry';

  async addInquiry(inquiry: Inquiry): Promise<Inquiry> {
    let inquiryAdded = await this.apiService.call(inquiryMock[0], this.apiService.request('post', `${this.PATH_CONTROLLER}`, inquiry, true)) as Inquiry;
    return Promise.resolve(inquiryAdded);
  }

  async getReceivedInquiries(pageNum: number, n: number): Promise<Inquiry[]> {
    let inquiries = await this.apiService.call(inquiryMock, this.apiService.request('get', `${this.PATH_CONTROLLER}/page/${pageNum}/${n}`, null, true)) as Inquiry[];
    return Promise.resolve(inquiries);
  }

  async viewInquiry(inquiryId: number): Promise<void> {
    await this.apiService.call(inquiryMock[0], this.apiService.request('post', `${this.PATH_CONTROLLER}/view/${inquiryId}`, null, true));
  }

  async getMyInquiries(pageNum: number, n: number): Promise<Inquiry[]> {
    let inquiries = await this.apiService.call(inquiryMock, this.apiService.request('get', `${this.PATH_CONTROLLER}/myInquiries/page/${pageNum}/${n}`, null, true)) as Inquiry[];
    return Promise.resolve(inquiries);
  }

  async deleteInquiry(inquiryId: number): Promise<void> {
    await this.apiService.call(null, this.apiService.request('delete', `${this.PATH_CONTROLLER}/delete/${inquiryId}`, null, true));
  }
}
