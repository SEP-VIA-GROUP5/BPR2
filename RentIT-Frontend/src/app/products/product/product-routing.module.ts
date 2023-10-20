import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {ProductsModulePage} from "src/app/products/products.module.page";
import {ProductsComponent} from "src/app/products/products/products.component";
import {ProductComponent} from "src/app/products/product/product/product.component";
import {ProductModulePage} from "src/app/products/product/product.module.page";

const routes: Routes = [
    {
      path: '',
      component: ProductModulePage,
      children: [
        {
          path: ':productId',
          component: ProductComponent,
        },
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {
}
