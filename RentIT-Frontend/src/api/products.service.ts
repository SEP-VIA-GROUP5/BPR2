import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Product} from "src/model/product";
import {mockedProducts} from "src/mocks/products.mock";
import {HttpParams} from "@angular/common/http";
import {ProductStatus} from "src/model/productStatus";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private apiService: ApiService<Product[]>
  ) {
  }

  PATH_CONTROLLER = 'product';

  async getProductsPerPage(pageNumber: number, pageSize: number): Promise<Product[]> {
    return await this.apiService.call(mockedProducts, this.apiService.request('get',`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`, null,false));
  }

  async getPageOfFilteredProducts(pageNumber: number, pageSize: number, filters: Map<string, string>): Promise<Product[]> {
    let params = new HttpParams();
    filters.forEach((value: string, key: string) => {
      params = params.append(key, value);
    });

    const endpoint = `${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}/filter`;
    return await this.apiService.call(mockedProducts, this.apiService.request('get', endpoint, null,false, params));
  }

  async getUsersProducts(): Promise<Product[]> {
    return await this.apiService.call(mockedProducts, this.apiService.request('get', `${this.PATH_CONTROLLER}/myList`, null, true));
  }

  async updateProductStatus(productId: number, status: ProductStatus): Promise<void> {
    await this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/status/${productId}/${status}`, null, true));
  }

  async updateProductStatusWithRentedUntil(productId: number, status: ProductStatus, rentedUntil: Date): Promise<void> {
    const formattedRentedUntil = format(rentedUntil, 'yyyy-MM-dd');

    await this.apiService.call(
      null,
      this.apiService.request('post', `${this.PATH_CONTROLLER}/status/${productId}/${status}/${formattedRentedUntil}`, null, true)
    );
  }

  async getProductsByUserEmail(email: string): Promise<Product[]> {
    return await this.apiService.call(mockedProducts, this.apiService.request('get', `${this.PATH_CONTROLLER}/productList/${email}`, null, false));
  }
}
