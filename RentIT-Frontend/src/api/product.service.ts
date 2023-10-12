import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Product} from "src/model/product";
import {mockedProducts} from "src/mocks/products.mock";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService<Product>,
  ) {
  }

  PATH_CONTROLLER = 'product';

  async addProduct(product: Product): Promise<Product> {
    return await this.apiService.call(mockedProducts[0], this.apiService.post(`${this.PATH_CONTROLLER}/add`, product, true));
  }
}
