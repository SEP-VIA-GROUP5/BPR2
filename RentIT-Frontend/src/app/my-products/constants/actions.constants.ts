import {ICONS} from "src/app/constants";

export enum ActionsConstants {
  REMOVE = 'Remove products',
  STATUS = 'Set status',
  EDIT = 'Edit product',
  NOT_SELECTED = 'Deselect action',
  DEFAULT = ''
}

export interface Action {
  action: ActionsConstants;
  isButtonEnabled: boolean;
  actionButtonText?: string;
  status?: string;
  icon?: ICONS;
}
