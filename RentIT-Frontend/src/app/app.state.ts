import {ProductsState, ProductsStateModel} from "src/app/products/products.state";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbSidebarService, NbToastrService} from "@nebular/theme";
import {produce} from "immer";
import { ProductsService } from "src/api/products.service";

export class ToggleNavigationBar {
  static readonly type = '[App] Toggle Navigation bar';
  constructor() {
  }
}

export interface AppStateModel {
  sidebarVisible: boolean;
}

export const defaultsState: AppStateModel = {
  sidebarVisible: true,
}

@State<AppStateModel>({
  name: 'productsPage',
  defaults: defaultsState,
})

@Injectable()
export class AppState {
  constructor(
    private toastrService: NbToastrService,
    private productsService: ProductsService,
    private sidebarService: NbSidebarService,
  ) {
  }
}

export class AppSelector {
}
