import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";
import { Product } from "src/model/product";
import { mockedProducts } from "src/mocks/products.mock";

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
    return await this.apiService.call(mockedProducts, this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`));
  }
}
