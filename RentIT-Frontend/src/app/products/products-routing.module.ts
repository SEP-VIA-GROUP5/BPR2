import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';
import {PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";

const routes: Routes = [
    {
      path: '',
      component: ProductsComponent,
    },
    {
      path: PRODUCTS_MENU_ITEM_URLS.ADDING_PRODUCTS.substring(1),
      component: AddingProductsComponent
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
