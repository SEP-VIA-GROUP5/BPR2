import {ICONS} from "src/app/constants";

export enum ActionsConstants {
  REMOVE = 'Remove products',
  NOT_SELECTED = 'Deselect action',
  DEFAULT = ''
}

export interface Action {
  action: ActionsConstants;
  isButtonEnabled: boolean;
  status?: string;
  icon?: ICONS;
}
