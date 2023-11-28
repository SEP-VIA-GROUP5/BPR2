import {ICONS} from "src/app/constants";
import {addDays, toUTCDate} from "src/core/utils/date.utils";
import {ProductSelected} from "src/app/shared-components/product-card/constants/constants";

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

export function computeRentedUntilDateWhenEditingStatus(productSelected: ProductSelected, actionSelected: Action) {
  if(actionSelected.action === ActionsConstants.STATUS) {
    let rentedUntilDate: Date = new Date();
    if(productSelected.product.rentedUntil) {
      rentedUntilDate = new Date(productSelected.product.rentedUntil);
    }
    return addDays(rentedUntilDate, 1);
  }
  return null;
}
