import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductsService} from "src/api/products.service";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {ImgurApiService} from "src/core/services/imgur.api.service";
import {
  AddProduct,
  ResetAddingProducts,
  UpdateImages,
  UploadImage
} from "src/app/products/adding-products/adding-products.actions";
import {produce} from "immer";
import {ProductService} from "src/api/product.service";
import {Router} from "@angular/router";

export interface AddingProductsStateModel {
  isFetching: boolean;
}

export const defaultsState: AddingProductsStateModel = {
  isFetching: false,
}

@State<AddingProductsStateModel>({
  name: 'addingProductsPage',
  defaults: defaultsState,
})

@Injectable()
export class AddingProductsState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
    private productService: ProductService,
    private imgurApiService: ImgurApiService,
    private router: Router,
  ) {
  }

  @Action(AddProduct)
  async addProduct(
    {getState, setState}: StateContext<AddingProductsStateModel>,
    action: AddProduct) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      let addedProduct = await this.productService.addProduct(action.product);
      if (addedProduct) {
        this.toastrService.success(
          'Product has been added successfully',
          'Success',
          {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
        );
        await this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
      } else {
        this.toastrService.danger(
          environment.production ?
            'Please contact the administration' : 'Could not add product',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      }
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })
      return setState(newState);
    } catch (error) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })
      setState(newState);
      return this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }
  }

  @Action(ResetAddingProducts)
  async resetAddingProducts(
    {setState}: StateContext<AddingProductsStateModel>) {
    setState(defaultsState);
  };
}
