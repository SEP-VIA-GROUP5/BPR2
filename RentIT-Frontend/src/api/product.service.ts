import {ApiService} from "src/core/services/api.service";
import {Injectable} from "@angular/core";
import {Product} from "src/model/product";
import {mockedProducts} from "src/mocks/products.mock";
import {ProductOverview} from "src/model/product-overview";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService<Product | ProductOverview>,
  ) {
  }

  PATH_CONTROLLER = 'product';

  async addProduct(product: Product): Promise<Product> {
    let productAdded = await this.apiService.call(mockedProducts[0], this.apiService.request('post',`${this.PATH_CONTROLLER}/add`, product, true)) as Product;
    return Promise.resolve(productAdded);
  }

  async getProductById(productId: number): Promise<ProductOverview> {
    let product = await this.apiService.call(mockedProducts[0], this.apiService.request('get',`${this.PATH_CONTROLLER}/id/${productId}`, null, false)) as ProductOverview;
    return Promise.resolve(product);
  }
}
