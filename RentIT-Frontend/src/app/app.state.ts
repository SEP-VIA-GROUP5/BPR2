import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbMenuItem} from "@nebular/theme";
import {produce} from "immer";
import {GENERAL_MENU_ITEMS, NOT_LOGGED_IN_CONTEXT_MENU} from "src/app/constants";

export class UpdateSidebarMenu {
  static readonly type = '[App] Update menu items';
  constructor(public menuItems: NbMenuItem[]) {
  }
}

export class UpdateContextMenu {
  static readonly type = '[App] Update context menu';
  constructor(public menuItems: NbMenuItem[]) {
  }
}


export interface AppStateModel {
  sidebarVisible: boolean;
  sidebarMenu: NbMenuItem[];
  contextMenu: NbMenuItem[];
}

export const defaultsState: AppStateModel = {
  sidebarVisible: true,
  sidebarMenu: GENERAL_MENU_ITEMS,
  contextMenu: NOT_LOGGED_IN_CONTEXT_MENU,
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

  @Action(UpdateSidebarMenu)
  async updateContextMenu(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateSidebarMenu) {

    let newState = produce(getState(), draft => {
      draft.contextMenu = action.menuItems;
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
  static contextMenu(state: AppStateModel) {
    return state.contextMenu;
  }
}
