import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './products.state';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './components/product/product.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {FormsModule} from "@angular/forms";

export const PRODUCTS_NG_MODULES = [
  NgOptimizedImage,
]

export const PRODUCTS_NEBULAR_COMPONENTS = [
  NbButtonModule,
  NbEvaIconsModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
  NbTooltipModule,
];

export const PRODUCTS_STATES = [
  ProductsState,
];

export const PRODUCTS_COMPONENTS = [
  ProductsComponent,
  ProductComponent,
];

@NgModule({
  declarations: [
    PRODUCTS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxsModule.forFeature(PRODUCTS_STATES),
    ...PRODUCTS_NEBULAR_COMPONENTS,
    ...PRODUCTS_NG_MODULES,
  ]
})
export class ProductsModule { }
