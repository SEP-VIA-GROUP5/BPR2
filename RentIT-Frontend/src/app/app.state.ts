import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {ContextMenuState, ICONS, LocalStorageEnum, SidebarMenuState} from "src/app/constants";
import {LocalStorageService} from "src/core/services/local-storage.service";

// actions
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

export class FetchLocalStorageData {
  static readonly type = '[App] Fetch local storage data';
  constructor() {
  }
}

// state model
export interface AppStateModel {
  isFetching: boolean;
  sidebarVisible: boolean;
  sidebarMenuState: SidebarMenuState;
  contextMenuState: ContextMenuState;
}

export const defaultsState: AppStateModel = {
  isFetching: false,
  sidebarVisible: true,
  sidebarMenuState: SidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN,
  contextMenuState: ContextMenuState.LOGGED_OUT,
}

@State<AppStateModel>({
  name: 'appPage',
  defaults: defaultsState,
})

@Injectable()
export class AppState {
  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  @Action(FetchLocalStorageData)
  async fetchLocalStorageData(
    {getState, setState}: StateContext<AppStateModel>
  ) {
    let sidebarMenuState = this.localStorageService.getData(LocalStorageEnum.SIDEBAR_MENU_ITEMS) as SidebarMenuState;
    let contextMenuState = this.localStorageService.getData(LocalStorageEnum.CONTEXT_MENU_ITEMS) as ContextMenuState;
    let newState = produce(getState(), draft => {
      draft.sidebarMenuState = sidebarMenuState ? sidebarMenuState : SidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN;
      draft.contextMenuState = contextMenuState ? contextMenuState : ContextMenuState.LOGGED_OUT;
    })
    setState(newState);
  }

  @Action(UpdateSidebarMenuState)
  async updateSidebarMenu(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateSidebarMenuState) {

    let newState = produce(getState(), draft => {
      draft.sidebarMenuState = action.sidebarMenuState;
      this.localStorageService.saveData(LocalStorageEnum.SIDEBAR_MENU_ITEMS, action.sidebarMenuState);
    })
    setState(newState);
  }

  @Action(UpdateContextMenuState)
  async contextMenuState(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateContextMenuState) {

    let newState = produce(getState(), draft => {
      draft.contextMenuState = action.contextMenuState;
      this.localStorageService.saveData(LocalStorageEnum.CONTEXT_MENU_ITEMS, action.contextMenuState);
    })
    setState(newState);
  }
}

// selectors
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
