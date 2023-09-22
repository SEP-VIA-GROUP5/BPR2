import { Observable } from "rxjs";
import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";
import { Product } from "src/model/product";
import { environment } from "src/environments/environment.dev";
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

  async getProductsPerPage(pageNumber, pageSize): Promise<Product[]> {
    if (environment.mocked) {
      await this.delayIfMocked();
      return Promise.resolve(mockedProducts);
    }
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`).toPromise();
  }

  private async delayIfMocked() {
    if(environment.mocked) {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);
    }
  }
}
