import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import {GENERAL_MENU_ITEM_URLS, PRODUCTS_MENU_ITEM_URLS} from 'src/app/constants';
import { AuthenticationComponent } from './authentication/authentication.component';
import {MyProductsComponent} from "src/app/my-products/my-products.component";
import {InquiriesComponent} from "src/app/inquiries/inquiries.component";

export const routes: Routes = [
  {
    path: PRODUCTS_MENU_ITEM_URLS.PRODUCTS.substring(1),
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: GENERAL_MENU_ITEM_URLS.MY_PRODUCTS.substring(1),
    title: 'My Products',
    component: MyProductsComponent,
  },
  {
    path: GENERAL_MENU_ITEM_URLS.INQUIRIES.substring(1),
    title: 'Inquiries',
    component: InquiriesComponent,
  },
  {
    path: GENERAL_MENU_ITEM_URLS.AUTHENTICATION.substring(1),
    title: 'Authentication',
    component: AuthenticationComponent,
  },
  {
    path: '',
    redirectTo: PRODUCTS_MENU_ITEM_URLS.PRODUCTS.substring(1),
    pathMatch: 'full',
  },
  {
    path: '**',
    title: "Oops! Couldn't find this page!",
    component: NotFoundComponent,
  },
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
