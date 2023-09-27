import { NbMenuItem } from '@nebular/theme';

export enum ICONS {
  CUBE_OUTLINE = 'cube-outline',
  FORWARD_ARROW_IOS = 'arrow-ios-forward-outline',
  FORWARD_BACK_IOS = 'arrow-ios-back-outline',
  SEARCH = 'search',
  ALERT_CIRCLE_OUTLINE = 'alert-circle-outline',
  MAP_OUTLINE = 'map-outline',
  LIST_OUTLINE = 'list-outline',
  ARROW_IOS_DOWNWARD_OUTLINE = 'arrow-ios-downward-outline',
  AT_OUTLINE = 'at-outline',
  EYE_OUTLINE = 'eye-outline',
  EYE_OFF_OUTLINE = 'eye-off-2-outline',
}

export enum GENERAL_MENU_ITEM_URLS {
  PRODUCTS = '/products',
  AUTHENTICATION = '/authentication',
}

export enum BREADCRUMB_KEYS {
  PRODUCTS = 'Products',
}

export const GENERAL_MENU_ITEMS: NbMenuItem[] = [
  {
    title: BREADCRUMB_KEYS.PRODUCTS,
    icon: ICONS.CUBE_OUTLINE,
    link: GENERAL_MENU_ITEM_URLS.PRODUCTS,
  },
];

export const isEmail = (email: string): boolean => {
    let regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return regexp.test(email);
}
