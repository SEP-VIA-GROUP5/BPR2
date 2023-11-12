import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {NgxsModule} from '@ngxs/store';
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {AddingProductsState} from "src/app/products/adding-products/adding-products.state";
import {ProductService} from "src/api/product.service";
import {SharedModule} from "src/core/share.module";
import {ProductsModulePage} from "src/app/products/products.module.page";
import {ProductsState} from "src/app/products/products/products.state";
import {ProductsComponent} from "src/app/products/products/products.component";
import {InquiryService} from "src/api/inquiry.service";

export const PRODUCTS_PROVIDERS = [
  ProductService,
  InquiryService,
]

export const PRODUCTS_STATES = [
  ProductsState,
  AddingProductsState,
];

export const PRODUCTS_COMPONENTS = [
  ProductsModulePage,
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
