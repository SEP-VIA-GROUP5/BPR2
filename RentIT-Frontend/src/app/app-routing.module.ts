import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "src/app/not-found/not-found.component";
import {GENERAL_MENU_ITEM_URLS} from "src/app/constants";

export const routes: Routes = [
  {
    path: GENERAL_MENU_ITEM_URLS.PRODUCTS.substring(1),
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
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
