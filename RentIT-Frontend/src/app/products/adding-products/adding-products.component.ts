import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {AddProduct, ResetAddingProducts} from "src/app/products/adding-products/adding-products.actions";
import {Observable} from "rxjs";
import {AddingProductsSelectors} from "src/app/products/adding-products/adding-products.selectors";
import {Product} from "src/model/product";

@Component({
  selector: 'app-adding-products',
  templateUrl: './adding-products.component.html',
  styleUrls: ['./adding-products.component.scss']
})
export class AddingProductsComponent implements OnInit, OnDestroy {
  @Select(AddingProductsSelectors.isFetching)
  isFetching$: Observable<boolean>;

  constructor(private userService: UserService,
              private toastrService: NbToastrService,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.userService.redirectUserIfNotLoggedIn();
  }

  onSubmit(productDetails: Product): void {
    this.store.dispatch(new AddProduct(productDetails));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetAddingProducts());
  }
}
