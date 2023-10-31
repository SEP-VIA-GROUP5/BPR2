import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {AddingProductsComponent} from "src/app/products/adding-products/adding-products.component";
import {ProductsModulePage} from "src/app/products/products.module.page";
import {ProductsComponent} from "src/app/products/products/products.component";
import {ProductComponent} from "src/app/products/product/product/product.component";

const routes: Routes = [
    {
      path: '',
      component: ProductsModulePage,
      children: [
        {
          title: 'Products',
          path: '',
          component: ProductsComponent,
        },
        {
          title: 'Add product',
          path: PRODUCTS_MENU_ITEM_URLS.ADDING_PRODUCTS.substring(1),
          component: AddingProductsComponent
        },
        {
          title: 'Product overview',
          path: PRODUCTS_MENU_ITEM_URLS.PRODUCT.substring(1),
          loadChildren: () =>
            import('./product/product.module').then((m) => m.ProductModule),
        }
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
