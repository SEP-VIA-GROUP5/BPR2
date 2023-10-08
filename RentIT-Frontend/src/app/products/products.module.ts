import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ProductsState} from './products.state';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './components/product/product.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbOptionModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTooltipModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {MapPickerComponent} from "src/core/components/map-picker/map-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from '@agm/core';
import {environment} from "src/environments/environment.dev";
import {NgxDropzoneModule} from "ngx-dropzone";

export const PRODUCTS_NG_MODULES = [
  FormsModule,
  NgxDropzoneModule,
]

export const PRODUCTS_AGM_MODULES = [
  AgmCoreModule.forRoot({
    apiKey: environment.google_api_key, // Replace with your API Key
  }),
]

export const PRODUCTS_PROVIDERS = [
]

export const PRODUCTS_NEBULAR_COMPONENTS = [
  NbButtonModule,
  NbEvaIconsModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbStepperModule,
  NbOptionModule,
  NbSelectModule,
];

export const PRODUCTS_STATES = [
  ProductsState,
];

export const PRODUCTS_COMPONENTS = [
  ProductsComponent,
  ProductComponent,
  AddingProductsComponent,
  MapPickerComponent,
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
    ...PRODUCTS_AGM_MODULES,
    ReactiveFormsModule,
  ],
  providers: [PRODUCTS_PROVIDERS],
})
export class ProductsModule {
}
