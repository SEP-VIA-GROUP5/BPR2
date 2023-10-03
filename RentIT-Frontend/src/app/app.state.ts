import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {ContextMenuState, ICONS, SidebarMenuState} from "src/app/constants";

export class UpdateSidebarMenuState {
  static readonly type = '[App] Update sidebar menu items';
  constructor(public sidebarMenuState: SidebarMenuState) {
  }
}

export class UpdateContextMenuState {
  static readonly type = '[App] Update context menu items';
  constructor(public contextMenuState: ContextMenuState) {
  }
}

export interface AppStateModel {
  isFetching: boolean;
  sidebarVisible: boolean;
  sidebarMenuState: SidebarMenuState;
  contextMenuState: ContextMenuState;
}

export const defaultsState: AppStateModel = {
  isFetching: false,
  sidebarVisible: true,
  sidebarMenuState: SidebarMenuState.GENERAL_ITEMS,
  contextMenuState: ContextMenuState.LOGGED_OUT,
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

  @Action(UpdateSidebarMenuState)
  async updateSidebarMenu(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateSidebarMenuState) {

    let newState = produce(getState(), draft => {
      draft.sidebarMenuState = action.sidebarMenuState;
    })
    setState(newState);
  }

  @Action(UpdateContextMenuState)
  async contextMenuState(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateContextMenuState) {

    let newState = produce(getState(), draft => {
      draft.contextMenuState = action.contextMenuState;
    })
    setState(newState);
  }
}

export class AppSelector {
  @Selector([AppState])
  static sidebarMenuState(state: AppStateModel) {
    return state.sidebarMenuState;
  }

  @Selector([AppState])
  static contextMenuState(state: AppStateModel) {
    return state.contextMenuState;
  }

  @Selector([AppState])
  static isFetching(state: AppStateModel) {
    return state.isFetching;
  }
}
