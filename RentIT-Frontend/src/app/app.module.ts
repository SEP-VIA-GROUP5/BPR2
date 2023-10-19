import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbActionsModule, NbBadgeModule,
  NbButtonModule, NbCardModule, NbContextMenuModule,
  NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule,
  NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbSearchModule, NbSelectModule,
  NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule,
  NbThemeModule,
  NbToastrModule, NbTooltipModule, NbUserModule, NbWindowModule
} from '@nebular/theme';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "src/environments/environment.dev";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NotFoundComponent} from './not-found/not-found.component';
import {ProductsService} from 'src/api/products.service';
import {ApiService} from 'src/core/services/api.service';
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthenticationComponent} from './authentication/authentication.component';
import {LocalStorageService} from "src/core/services/local-storage.service";
import {AppState} from "src/app/app.state";
import {UserService} from "src/api/user.service";
import {AuthenticationState} from "src/app/authentication/authentication.state";
import {UrlSerializer} from "@angular/router";
import {LowerCaseUrlSerializer} from "src/core/providers/lowercase-deserializer.provider";
import {ImgurApiService} from "src/core/services/imgur.api.service";
import {MyProductsComponent} from "src/app/my-products/my-products.component";
import {SharedModule} from "src/core/share.module";
import {ProductsModule} from "src/app/products/products.module";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {AgGridModule} from "ag-grid-angular";

export const STATES = [
  AppState,
  AuthenticationState,
];

export const PAGE_COMPONENTS = [
  AppComponent,
  NotFoundComponent,
  AuthenticationComponent,
  MyProductsComponent,
];

export const APP_NEBULAR_MODULES = [
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot(),
  NbDialogModule.forRoot(),
  NbMenuModule.forRoot(),
  NbWindowModule.forRoot(),
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

@NgModule({
  declarations: [
    PAGE_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    //NgxsModules setup
    NgxsModule.forRoot(STATES, {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NbThemeModule.forRoot({name: 'corporate'}),
    ...APP_NEBULAR_MODULES,
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
