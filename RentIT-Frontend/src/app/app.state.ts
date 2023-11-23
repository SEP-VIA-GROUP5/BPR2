import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {produce} from "immer";
import {GeneralSidebarMenuState, LocalStorageEnum, UserSidebarMenuState} from "src/app/constants";
import {LocalStorageService} from "src/core/services/local-storage.service";

// actions
export class UpdateGeneralSidebarMenuState {
  static readonly type = '[App] Update general sidebar menu items';
  constructor(public generalSidebarMenuState: GeneralSidebarMenuState) {
  }
}

export class UpdateUserSidebarMenuState {
  static readonly type = '[App] Update user sidebar menu items';
  constructor(public userSidebarMenuState: UserSidebarMenuState) {
  }
}

export class FetchLocalStorageData {
  static readonly type = '[App] Fetch local storage data';
  constructor() {
  }
}

export class SelectSidebarMenuItem {
  static readonly type = '[App] Select sidebar menu item';

  constructor(link: string) {
  }
}

export class SelectContextMenuItem {
  static readonly type = '[App] Select context menu item';

  constructor(link: string) {
  }
}

// state model
export interface AppStateModel {
  isFetching: boolean;
  sidebarVisible: boolean;
  generalSidebarMenuState: GeneralSidebarMenuState;
  userSidebarMenuState: UserSidebarMenuState;
}

export const defaultsState: AppStateModel = {
  isFetching: false,
  sidebarVisible: true,
  generalSidebarMenuState: GeneralSidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN,
  userSidebarMenuState: UserSidebarMenuState.USER_ITEMS_NOT_LOGGED_IN,
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
    let generalSidebarMenuState = this.localStorageService.getData(LocalStorageEnum.GENERAL_SIDEBAR_MENU_ITEMS) as GeneralSidebarMenuState;
    let userSidebarMenuState = this.localStorageService.getData(LocalStorageEnum.USER_SIDEBAR_MENU_ITEMS) as UserSidebarMenuState;
    let newState = produce(getState(), draft => {
      draft.generalSidebarMenuState = generalSidebarMenuState ? generalSidebarMenuState : GeneralSidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN;
      draft.userSidebarMenuState = userSidebarMenuState ? userSidebarMenuState : UserSidebarMenuState.USER_ITEMS_NOT_LOGGED_IN;
    })
    setState(newState);
  }

  @Action(UpdateGeneralSidebarMenuState)
  async updateGeneralSidebarMenuState(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateGeneralSidebarMenuState) {

    let newState = produce(getState(), draft => {
      draft.generalSidebarMenuState = action.generalSidebarMenuState;
      this.localStorageService.saveData(LocalStorageEnum.GENERAL_SIDEBAR_MENU_ITEMS, action.generalSidebarMenuState);
    })
    setState(newState);
  }

  @Action(UpdateUserSidebarMenuState)
  async updateUserSidebarMenuState(
    {getState, setState}: StateContext<AppStateModel>,
    action: UpdateUserSidebarMenuState) {

    let newState = produce(getState(), draft => {
      draft.userSidebarMenuState = action.userSidebarMenuState;
      this.localStorageService.saveData(LocalStorageEnum.USER_SIDEBAR_MENU_ITEMS, action.userSidebarMenuState);
    })
    setState(newState);
  }
}

// selectors
export class AppSelector {
  @Selector([AppState])
  static generalSidebarMenuState(state: AppStateModel) {
    return state.generalSidebarMenuState;
  }

  @Selector([AppState])
  static userSidebarMenuState(state: AppStateModel) {
    return state.userSidebarMenuState;
  }

  @Selector([AppState])
  static isFetching(state: AppStateModel) {
    return state.isFetching;
  }
}
