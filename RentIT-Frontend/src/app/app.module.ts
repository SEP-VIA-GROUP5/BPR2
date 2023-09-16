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
  NbListModule, NbSpinnerModule, NbIconModule, NbActionsModule, NbDialogModule, NbToastrModule, NbSidebarModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environment/environment.prod";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AgGridModule} from "ag-grid-angular";


export const STATES = [

];

export const PAGE_COMPONENTS = [
  AppComponent,
  ProductsComponent,
  NotFoundComponent,
];

export const CORE_COMPONENTS = [

];

export const PROVIDERS = [

];

export const NEBULAR_MODULES = [
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot(),
  NbLayoutModule,
  NbDialogModule.forRoot(),
  NbButtonModule,
  NbEvaIconsModule,
  NbActionsModule,
  NbMenuModule,
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
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NbThemeModule.forRoot({ name: 'corporate' }),
    NEBULAR_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
