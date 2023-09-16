import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "src/app/products/products.component";

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
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
