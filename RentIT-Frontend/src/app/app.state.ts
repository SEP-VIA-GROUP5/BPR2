import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbMenuItem} from "@nebular/theme";
import {produce} from "immer";
import {SidebarMenuState} from "src/app/constants";

export class UpdateSidebarMenu {
  static readonly type = '[App] Update menu items';
  constructor(public sidebarMenuState: SidebarMenuState) {
  }
}

export interface AppStateModel {
  isFetching: boolean;
  sidebarVisible: boolean;
  sidebarMenuState: SidebarMenuState;
}

export const defaultsState: AppStateModel = {
  isFetching: false,
  sidebarVisible: true,
  sidebarMenuState: SidebarMenuState.GENERAL_ITEMS,
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
      draft.sidebarMenuState = action.sidebarMenuState;
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
  static isFetching(state: AppStateModel) {
    return state.isFetching;
  }
}
