import {NbMenuItem} from '@nebular/theme';

export enum ICONS {
  CUBE_OUTLINE = 'cube-outline',
  SEARCH = 'search',
  ALERT_CIRCLE_OUTLINE = 'alert-circle-outline',
  MAP_OUTLINE = 'map-outline',
  LIST_OUTLINE = 'list-outline',
  ARROW_IOS_DOWNWARD_OUTLINE = 'arrow-ios-downward-outline',
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

export enum CONTEXT_MENU_TITLES {
  LOG_IN = 'Log in',
  LOG_OUT = 'Log out',
}

export function GENERAL_MENU_ITEMS(): NbMenuItem[] {
  return [
    {
      title: BREADCRUMB_KEYS.PRODUCTS,
      icon: ICONS.CUBE_OUTLINE,
      link: GENERAL_MENU_ITEM_URLS.PRODUCTS,
    },
  ];
}

export function LOGGED_OUT_CONTEXT_MENU_ITEMS(): NbMenuItem[] {
  return [
    {
      title: CONTEXT_MENU_TITLES.LOG_IN,
      link: GENERAL_MENU_ITEM_URLS.AUTHENTICATION
    },
  ]
}

export function LOGGED_IN_CONTEXT_MENU_ITEMS(): NbMenuItem[] {
  return [
    {
      title: CONTEXT_MENU_TITLES.LOG_OUT,
      link: '',
    }
  ]
}

export enum LocalStorageEnum {
  TOKEN = 'TOKEN',
  USER = 'USER',
}

export enum SidebarMenuState {
  GENERAL_ITEMS= 'GENERAL_ITEMS',
}

export enum ContextMenuState {
  LOGGED_OUT = 'LOGGED_OUT',
  LOGGED_IN = 'LOGGED_IN'
}
