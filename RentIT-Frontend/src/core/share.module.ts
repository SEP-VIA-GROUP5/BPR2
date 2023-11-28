import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ProductCardComponent} from "src/app/shared-components/product-card/product-card.component";
import {SearchBarComponent} from "src/app/shared-components/search-bar/search-bar.component";
import {MapPickerComponent} from "src/app/shared-components/map-picker/map-picker.component";
import {AgmCoreModule} from "@agm/core";
import {environment} from "src/environments/environment.dev";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbAccordionModule,
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbOptionModule,
  NbPopoverModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTagModule,
  NbTooltipModule,
  NbUserModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AgGridModule} from "ag-grid-angular";
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgImageSliderModule} from "ng-image-slider";
import {RouterModule} from "@angular/router";
import {NgxImageSwiperModule} from "ngx-image-swiper";
import {
  ViewImagesSliderComponent
} from "src/app/shared-components/view-images/view-images-slider/view-images-slider.component";
import {
  ViewImagesSwiperComponent
} from "src/app/shared-components/view-images/view-images-swiper/view-images-swiper.component";
import {StarsRatingComponent} from "src/app/shared-components/stars-rating/stars-rating.component";
import {AddingProductsDetailsComponent} from "src/app/shared-components/add-products-details/add-products-details.component";

export const NEBULAR_MODULES = [
  NbLayoutModule,
  NbButtonModule,
  NbEvaIconsModule,
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
  NbListModule,
  AgGridModule,
  NbSearchModule,
  NbInputModule,
  NbFormFieldModule,
  NbTooltipModule,
  NbSelectModule,
  NbTabsetModule,
  NbPopoverModule,
  NbUserModule,
  NbBadgeModule,
  NbTagModule,
  NbContextMenuModule,
  NbStepperModule,
  NbOptionModule,
  NbAccordionModule,
  NbCheckboxModule,
];

export const SHARED_COMPONENTS = [
  ProductCardComponent,
  SearchBarComponent,
  MapPickerComponent,
  ViewImagesSliderComponent,
  ViewImagesSwiperComponent,
  StarsRatingComponent,
  AddingProductsDetailsComponent,
];

export const NG_MODULES = [
  FormsModule,
  NgxDropzoneModule,
  NgImageSliderModule,
  NgxImageSwiperModule
]

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key, // Replace with your API Key
    }),
    ReactiveFormsModule,
    NEBULAR_MODULES,
    NG_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...SHARED_COMPONENTS,
    NEBULAR_MODULES,
    NG_MODULES,
  ],
  providers: [

  ]
})
export class SharedModule {
}
