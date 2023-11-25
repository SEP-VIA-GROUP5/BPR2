import {ICONS} from "src/app/constants";

export enum ActionsConstants {
  REMOVE = 'Remove products',
  STATUS = 'Set status',
  NOT_SELECTED = 'Deselect action',
  DEFAULT = ''
}

export interface Action {
  action: ActionsConstants;
  isButtonEnabled: boolean;
  status?: string;
  icon?: ICONS;
}

export function convertEnumActionsInList(): ActionsConstants[] {
  return Object.values(ActionsConstants).map(action => {
    return action;
  });
}
