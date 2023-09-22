import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ProductsState, ProductsStateModel} from "src/app/products/products.state";
import {Product} from "src/model/product";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {ProductsService} from "src/api/products.service";

export interface BreadcrumbItem {
  id: string,
  name: string,
  link: string,
  icon?: string,
}

export class UpdateBreadcrumbItems {
  static readonly type = '[App] Update breadcrumb items';
  constructor(breadcrumbItem: BreadcrumbItem) {
  }
}

export interface AppStateModel {
  breadcrumbItems: BreadcrumbItem[];
}

export const defaultsState: AppStateModel = {
  breadcrumbItems: [],
}

@State<AppStateModel>({
  name: 'app',
  defaults: defaultsState,
})

@Injectable()
export class AppState {
  constructor(
  ) {
  }

  @Action(UpdateBreadcrumbItems)
  async updateBreadcrumbItems(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateBreadcrumbItems) {

  }
}

export class AppSelector {
  @Selector([AppState])
  static breadcrumbItems(state: AppStateModel) {
    return state.breadcrumbItems;
  }
}
