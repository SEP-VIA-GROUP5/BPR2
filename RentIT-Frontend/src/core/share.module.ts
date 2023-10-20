import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ProductCardComponent} from "src/app/shared-components/product-card/product-card.component";
import {SearchBarComponent} from "src/app/shared-components/search-bar/search-bar.component";
import {MapPickerComponent} from "src/app/shared-components/map-picker/map-picker.component";
import {AgmCoreModule} from "@agm/core";
import {environment} from "src/environments/environment.dev";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbActionsModule, NbBadgeModule,
  NbButtonModule, NbCardModule, NbContextMenuModule,
  NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule,
  NbLayoutModule, NbListModule, NbMenuModule, NbOptionModule, NbPopoverModule, NbSearchModule, NbSelectModule,
  NbSidebarModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbTagModule,
  NbToastrModule, NbTooltipModule, NbUserModule, NbWindowModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AgGridModule} from "ag-grid-angular";
import {ViewImagesComponent} from "src/app/shared-components/view-images/view-images.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgImageSliderModule} from "ng-image-slider";
import {RouterModule} from "@angular/router";

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
];

export const SHARED_COMPONENTS = [
  ProductCardComponent,
  SearchBarComponent,
  MapPickerComponent,
  ViewImagesComponent,
];

export const NG_MODULES = [
  FormsModule,
  NgxDropzoneModule,
  NgImageSliderModule,
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
    FormsModule,
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
