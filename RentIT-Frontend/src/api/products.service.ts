import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";
import { Product } from "src/model/product";
import { mockedProducts } from "src/mocks/products.mock";
import { simulateAPICall } from "src/constants";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private apiService: ApiService<Product[]>
  ) {
  }

  PATH_CONTROLLER = 'product';

  async getProductsPerPage(pageNumber, pageSize): Promise<Product[]> {
    await simulateAPICall(mockedProducts);
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`).toPromise();
  }
}
