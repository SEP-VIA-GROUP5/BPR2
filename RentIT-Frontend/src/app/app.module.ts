import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbPopoverModule,
  NbTabsetModule,
  NbSelectModule,
  NbTooltipModule,
  NbFormFieldModule,
  NbInputModule,
  NbMenuModule,
  NbSearchModule,
  NbListModule,
  NbSpinnerModule,
  NbIconModule,
  NbActionsModule,
  NbDialogModule,
  NbToastrModule,
  NbSidebarModule,
  NbUserModule, NbBadgeModule, NbTagModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "src/environments/environment.dev";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AgGridModule} from "ag-grid-angular";
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { ProductComponent } from './products/components/product/product.component';
import {ProductsState} from "src/app/products/products.state";
import { ProductsService } from 'src/api/products.service';
import { ApiService } from 'src/core/services/api.service';
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";


export const STATES = [
  ProductsState,
];

export const PAGE_COMPONENTS = [
  AppComponent,
  ProductsComponent,
  NotFoundComponent,
];

export const CORE_COMPONENTS = [
  SearchBarComponent,
  ProductComponent,
];

export const PROVIDERS = [
  ApiService,
  ProductsService,
];

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
