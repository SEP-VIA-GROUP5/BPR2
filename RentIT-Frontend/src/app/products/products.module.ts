import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ProductsState} from './products.state';
import {ProductsComponent} from './products.component';
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {AddingProductsState} from "src/app/products/adding-products/adding-products.state";
import {ProductService} from "src/api/product.service";
import {SharedModule} from "src/core/share.module";

export const PRODUCTS_PROVIDERS = [
  ProductService,
]

export const PRODUCTS_STATES = [
  ProductsState,
  AddingProductsState,
];

export const PRODUCTS_COMPONENTS = [
  ProductsComponent,
  AddingProductsComponent,
];

@NgModule({
  declarations: [
    PRODUCTS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxsModule.forFeature(PRODUCTS_STATES),
  ],
  providers: [PRODUCTS_PROVIDERS],
})
export class ProductsModule {
}
