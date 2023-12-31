import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {ProductService} from "src/api/product.service";
import {SharedModule} from "src/core/share.module";
import {ProductRoutingModule} from "src/app/products/product/product-routing.module";
import {ProductModulePage} from "src/app/products/product/product.module.page";
import {ProductComponent} from "src/app/products/product/product/product.component";
import {ProductState} from "src/app/products/product/product/product.state";
import {ReviewsService} from "src/api/reviews.service";
import {ReportsService} from "src/api/reports.service";
import {NbDatepickerModule} from "@nebular/theme";

export const PRODUCTS_PROVIDERS = [
  ProductService,
  ReviewsService,
  ReportsService,
]

export const PRODUCTS_STATES = [
  ProductState,
];

export const PRODUCTS_COMPONENTS = [
  ProductModulePage,
  ProductComponent,
];

@NgModule({
  declarations: [
    PRODUCTS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    NbDatepickerModule.forRoot(),
    ProductRoutingModule,
    SharedModule,
    NgxsModule.forFeature(PRODUCTS_STATES),
  ],
  providers: [PRODUCTS_PROVIDERS],
})
export class ProductModule {
}
