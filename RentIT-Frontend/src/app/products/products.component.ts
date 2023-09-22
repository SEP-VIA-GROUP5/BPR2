import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ProductsFetch, ProductsReset} from "src/app/products/products.actions";
import {ProductsSelector} from "src/app/products/products.selector";
import {Observable} from "rxjs";
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";

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

  protected readonly ICONS = ICONS;
  alive: boolean = true;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductsFetch());
  }

  loadNextProducts() {
    this.store.dispatch(new ProductsFetch());
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new ProductsReset());
  }
}
