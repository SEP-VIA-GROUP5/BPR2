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
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTagModule,
  NbTooltipModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {MapPickerComponent} from "src/core/components/map-picker/map-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from '@agm/core';
import {environment} from "src/environments/environment.dev";
import {NgxDropzoneModule} from "ngx-dropzone";
import {AddingProductsState} from "src/app/products/adding-products/adding-products.state";
import {NgImageSliderModule} from "ng-image-slider";
import {ViewImagesComponent} from "src/core/components/view-images/view-images.component";
import {ProductService} from "src/api/product.service";

export const PRODUCTS_NG_MODULES = [
  FormsModule,
  NgxDropzoneModule,
  NgImageSliderModule,
]

export const PRODUCTS_AGM_MODULES = [
  AgmCoreModule.forRoot({
    apiKey: environment.google_api_key, // Replace with your API Key
  }),
]

export const PRODUCTS_PROVIDERS = [
  ProductService,
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
  AddingProductsState,
];

export const PRODUCTS_COMPONENTS = [
  ProductsComponent,
  ProductComponent,
  AddingProductsComponent,
  MapPickerComponent,
  ViewImagesComponent,
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
    NbFormFieldModule,
    NbInputModule,
    NbTagModule,
  ],
  providers: [PRODUCTS_PROVIDERS],
})
export class ProductsModule {
}
