import { Observable } from "rxjs";
import { ApiService } from "src/core/services/api.service";
import { Injectable } from "@angular/core";
import { Product } from "src/model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private apiService: ApiService<Product[]>
  ) {
  }

  PATH_CONTROLLER = 'product';

  getMoviesPerPage(pageNumber, pageSize): Observable<Product[]> {
    return this.apiService.get(`${this.PATH_CONTROLLER}/page/${pageNumber}/${pageSize}`);
  }
}
