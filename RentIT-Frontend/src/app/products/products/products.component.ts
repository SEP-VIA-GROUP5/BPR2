import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {Product} from "src/model/product";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {ProductsFetch, ProductsReset} from "src/app/products/products/products.actions";
import {ProductsSelector} from "src/app/products/products/products.selector";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Select(ProductsSelector.isFetching)
  isFetching$: Observable<boolean>;
  @Select(ProductsSelector.products)
  products$: Observable<Product[]>
  @Select(ProductsSelector.endOfList)
  endOfList$: Observable<boolean>;

  // constants
  protected readonly ICONS = ICONS;

  alive: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductsFetch());
  }

  loadNextProducts() {
    this.store.dispatch(new ProductsFetch());
  }

  navigateToAddingProductPage() {
    this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS.concat(PRODUCTS_MENU_ITEM_URLS.ADDING_PRODUCTS)]);
  }

  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  getProductGridClass(products: Product[]): string {
    if (products.length >= 1 && products.length <= 3) {
      return 'limited-products';
    }
    return '';
  }


  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new ProductsReset());
  }
}