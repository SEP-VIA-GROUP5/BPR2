import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbThemeModule,
  NbToastrModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "src/environments/environment.dev";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NotFoundComponent} from './not-found/not-found.component';
import {AgGridModule} from "ag-grid-angular";
import {SearchBarComponent} from 'src/core/components/search-bar/search-bar.component';
import {ProductsService} from 'src/api/products.service';
import {ApiService} from 'src/core/services/api.service';
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthenticationComponent} from './authentication/authentication.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {AppState} from "src/app/app.state";
import {UserService} from "src/api/user.service";
import {AuthenticationState} from "src/app/authentication/authentication.state";
import {UrlSerializer} from "@angular/router";
import {LowerCaseUrlSerializer} from "src/core/providers/lowercase-deserializer.provider";
import {ImgurApiService} from "src/core/services/imgur.api.service";
import {MapPickerComponent} from "src/core/components/map-picker/map-picker.component";
import {AgmCoreModule} from "@agm/core";


export const STATES = [
  AppState,
  AuthenticationState,
];

export const AGM_MODULES = [
  AgmCoreModule.forRoot({
    apiKey: environment.google_api_key, // Replace with your API Key
  }),
  ReactiveFormsModule,
]

export const PAGE_COMPONENTS = [
  AppComponent,
  NotFoundComponent,
  AuthenticationComponent,
];

export const CORE_COMPONENTS = [
  SearchBarComponent,
  MapPickerComponent,
];

export const PROVIDERS = [
  ApiService,
  LocalStorageService,
  ProductsService,
  ProductsService,
  UserService,
  {
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer,
  },
  ImgurApiService,
];

export const NG_MODULES = [
  FormsModule,
]

export const NEBULAR_MODULES = [
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot(),
  NbLayoutModule,
  NbDialogModule.forRoot(),
  NbButtonModule,
  NbEvaIconsModule,
  NbActionsModule,
  NbMenuModule.forRoot(),
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
  NbWindowModule.forRoot(),
];

@NgModule({
  declarations: [
    PAGE_COMPONENTS,
    ...CORE_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //NgxsModules setup
    NgxsModule.forRoot(STATES, {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NbThemeModule.forRoot({name: 'corporate'}),
    NEBULAR_MODULES,
    NG_MODULES,
    AGM_MODULES,
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
