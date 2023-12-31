import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
