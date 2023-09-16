import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "src/app/products/products.component";
import {NotFoundComponent} from "src/app/not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '',
    redirectTo: '/products',
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
