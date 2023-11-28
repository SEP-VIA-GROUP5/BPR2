import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {NbToastrService} from "@nebular/theme";
import {Product} from "src/model/product";
import {
  ChangeProductsStatus, EditProduct,
  MyProductsFetch,
  MyProductsReset,
  RemoveProducts
} from "src/app/my-products/my-products.actions";
import {ProductsService} from "src/api/products.service";
import {ProductService} from "src/api/product.service";
import {environment} from "src/environments/environment.dev";
import {ICONS} from "src/app/constants";
import {ProductStatus} from "src/model/productStatus";
import {StatusSelected} from "src/app/shared-components/product-card/constants/constants";

export interface MyProductsStateModel {
  isFetching: boolean;
  products: Product[];
}

export const defaultsState: MyProductsStateModel = {
  isFetching: false,
  products: [],
}

@State<MyProductsStateModel>({
  name: 'myProductsPage',
  defaults: defaultsState,
})

@Injectable()
export class MyProductsState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
    private productService: ProductService,
  ) {
  }

  @Action(MyProductsFetch)
  async myProductsFetch(
    {getState, setState}: StateContext<MyProductsStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      let products = await this.productsService.getUsersProducts();
      newState = produce(getState(), draft => {
        draft.products = products;
        draft.isFetching = false;
      });
      return setState(newState);
    } catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);

    }
  }

  @Action(RemoveProducts)
  async removeProducts(
    {getState, setState}: StateContext<MyProductsStateModel>,
    action: RemoveProducts) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      for (const product of action.products) {
        await this.productService.removeProductById(product.id);
      }
      newState = produce(getState(), draft => {
        draft.products = draft.products.filter(product => !action.products.includes(product));
        draft.isFetching = false;
      });
      setState(newState);
      window.location.reload();
    } catch (error) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })
      setState(newState);
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }
  }

  @Action(ChangeProductsStatus)
  async changeProductsStatus(
    {getState, setState}: StateContext<MyProductsStateModel>,
    action: ChangeProductsStatus) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      for (const productSelected of action.productsSelected) {
        //TODO fetch data as well, if that's available and status of the product is RENTED
        const statusSelected: ProductStatus = this.getSelectedStatus(productSelected.statusSelectedList);
        if(productSelected.rentedUntil && statusSelected === ProductStatus.RENTED) {
          await this.productsService.updateProductStatusWithRentedUntil(productSelected.product.id, statusSelected, productSelected.rentedUntil);
        }
        else {
          await this.productsService.updateProductStatus(productSelected.product.id, statusSelected);
        }
      }
      newState = produce(getState(), draft => {
        draft.products = draft.products.map(product => {
          for (const productSelected of action.productsSelected) {
            if (product.id === productSelected.product.id) {
              const statusSelected: ProductStatus = this.getSelectedStatus(productSelected.statusSelectedList);
              return {
                ...product,
                status: statusSelected,
              }
            }
          }
          return product;
        });
        draft.isFetching = false;
      });
      setState(newState);
      window.location.reload();
    }
    catch (error) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })
      setState(newState);
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : error,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
    }
  }

  @Action(EditProduct)
  async editProduct(
    {getState, setState}: StateContext<MyProductsStateModel>,
    action: EditProduct) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      const updatedProduct = await this.productService.updateProductById(action.product);
      newState = produce(getState(), draft => {
        draft.products = draft.products.map(product => {
          if (product.id === action.product.id) {
            return action.product;
          }
          return product;
        });
        draft.isFetching = false;
      });
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

  @Action(MyProductsReset)
  async myProductsReset(
    {setState}: StateContext<MyProductsStateModel>) {
    setState(defaultsState);
  }

  private getSelectedStatus(statusSelectedList: StatusSelected[]): ProductStatus {
    return statusSelectedList.find(statusSelected => statusSelected.isStatusListSelected).productStatus;
  }

}
