import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ICONS} from "src/app/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ProductSelector} from "src/app/products/product/product/product.selector";
import {ProductFetch} from "src/app/products/product/product/product.actions";
import {ProductOverview} from "src/model/product-overview";
import {ProductStatus} from "src/model/productStatus";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Select(ProductSelector.isFetching)
  isFetching$: Observable<boolean>;
  @Select(ProductSelector.product)
  product$: Observable<ProductOverview>

  productId: number;
  // constants
  protected readonly ICONS = ICONS;

  alive: boolean = true;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.store.dispatch(new ProductFetch(this.productId));
  }

  getProductInfoStatusBadge(productStatus: ProductStatus) {
    switch (productStatus) {
      case ProductStatus.AVAILABLE:
        return 'Available';
      case ProductStatus.UNAVAILABLE:
        return 'Unavailable';
      case ProductStatus.PAUSED:
        return 'Paused';
      case ProductStatus.RENTED:
        return 'Rented';
    }
  }

  getProductStatusColorBadge(productStatus: ProductStatus) {
    switch (productStatus) {
      case ProductStatus.AVAILABLE:
        return 'success';
      case ProductStatus.RENTED:
      case ProductStatus.UNAVAILABLE:
        return 'danger';
      case ProductStatus.PAUSED:
        return 'warning';
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
