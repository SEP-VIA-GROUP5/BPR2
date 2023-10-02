import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbMenuItem} from "@nebular/theme";
import {produce} from "immer";
import {GENERAL_MENU_ITEMS} from "src/app/constants";

export class UpdateSidebarMenu {
  static readonly type = '[App] Update menu items';
  constructor(public menuItems: NbMenuItem[]) {
  }
}

export interface AppStateModel {
  isFetching: boolean;
  sidebarVisible: boolean;
  sidebarMenu: NbMenuItem[];
}

export const defaultsState: AppStateModel = {
  isFetching: false,
  sidebarVisible: true,
  sidebarMenu: GENERAL_MENU_ITEMS,
}

@State<AppStateModel>({
  name: 'appPage',
  defaults: defaultsState,
})

@Injectable()
export class AppState {
  constructor(
  ) {
  }

  @Action(UpdateSidebarMenu)
  async updateSidebarMenu(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateSidebarMenu) {

    let newState = produce(getState(), draft => {
      draft.sidebarMenu = action.menuItems;
    })
    setState(newState);
  }
}

export class AppSelector {
  @Selector([AppState])
  static sidebarMenu(state: AppStateModel) {
    return state.sidebarMenu;
  }

  @Selector([AppState])
  static isFetching(state: AppStateModel) {
    return state.isFetching;
  }
}
