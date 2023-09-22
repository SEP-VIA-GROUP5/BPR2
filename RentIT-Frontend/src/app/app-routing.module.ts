import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "src/app/products/products.component";
import {NotFoundComponent} from "src/app/not-found/not-found.component";
import {BREADCRUMB_KEYS, GENERAL_MENU_ITEM_URLS} from "src/app/constants";
import {ProductOverviewComponent} from "src/app/products/product-overview/product-overview.component";

export const routes: Routes = [
  {
    path: GENERAL_MENU_ITEM_URLS.PRODUCTS.substring(1),
    component: ProductsComponent,
    data: {
      breadcrumb: BREADCRUMB_KEYS.PRODUCTS,
    },
  },
  {
    path: "products/dsad",
    component: ProductOverviewComponent,
    data: {
      breadcrumb: BREADCRUMB_KEYS.PRODUCTS,
    },
  },
  {
    path: '',
    redirectTo: GENERAL_MENU_ITEM_URLS.PRODUCTS,
    pathMatch: 'full',
  },
  {
    path: '**',
    title: "Oops! Couldn't find this page!",
    component: NotFoundComponent,
  }
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
