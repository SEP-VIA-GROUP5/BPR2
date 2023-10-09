import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {ProductsReset} from "src/app/products/products.actions";
import {ICONS} from "src/app/constants";
import {environment} from "src/environments/environment.dev";
import {ProductsService} from "src/api/products.service";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {ImgurApiService} from "src/core/services/imgur.api.service";
import {UploadImage} from "src/app/products/adding-products/adding-products.actions";
import {produce} from "immer";

export interface AddingProductsStateModel {
  isFetching: boolean;
  uploadedImages: ImgurImageResponse[];
}

export const defaultsState: AddingProductsStateModel = {
  isFetching: false,
  uploadedImages: [],
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
    private imgurApiService: ImgurApiService,
  ) {
  }

  @Action(UploadImage)
  async uploadImage(
    {getState, setState}: StateContext<AddingProductsStateModel>,
    action: UploadImage) {
    let uploadedImage: ImgurImageResponse;

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    try {
      uploadedImage = await this.imgurApiService.post(action.image);
      if (uploadedImage.status === 200) {
        console.log(uploadedImage);
        newState = produce(getState(), draft => {
          draft.uploadedImages.push(uploadedImage);
        })
        setState(newState);
      } else {
        return this.toastrService.danger(
          environment.production ?
            'Please contact the administration' : 'Could not upload image',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      }
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

    newState = produce(getState(), draft => {
      draft.isFetching = false;
    })
    return setState(newState);
  }

  @Action(ProductsReset)
  async productsReset(
    {setState}: StateContext<AddingProductsStateModel>) {
    setState(defaultsState);
  };
}
