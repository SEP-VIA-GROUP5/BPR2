import {NbMenuItem} from '@nebular/theme';
import {UrlSegment} from "@angular/router";

export enum ICONS {
  CUBE_OUTLINE = 'cube-outline',
  SEARCH = 'search',
  ALERT_CIRCLE_OUTLINE = 'alert-circle-outline',
  MAP_OUTLINE = 'map-outline',
  LIST_OUTLINE = 'list-outline',
  ARROW_IOS_DOWNWARD_OUTLINE = 'arrow-ios-downward-outline',
  EYE_OUTLINE = 'eye-outline',
  EYE_OFF_OUTLINE = 'eye-off-2-outline',
  LOG_IN_OUTLINE = 'log-in-outline',
  LOG_OUT_OUTLINE = 'log-out-outline',
  PLUS_OUTLINE = 'plus-outline',
  CHECKMARK_CIRCLE_OUTLINE = 'checkmark-circle-outline',
  IMAGE_OUTLINE = 'image-outline',
  TRASH_2_OUTLINE = 'trash-2-outline',
  CHECKMARK_OUTLINE = 'checkmark-outline',
  MESSAGE_SQUARE_OUTLINE = 'message-square-outline',
  QUESTION_MARK_CIRCLE_OUTLINE = 'question-mark-circle-outline',
  FUNNEL_OUTLINE = 'funnel-outline',
  BOOK_OPEN_OUTLINE = 'book-open-outline',
}

export enum GENERAL_MENU_ITEM_URLS {
  AUTHENTICATION = '/authentication',
  MY_PRODUCTS = '/my-products',
  INQUIRIES = '/inquiries',
}

export enum PRODUCTS_MENU_ITEM_URLS {
  PRODUCTS = '/products',
  PRODUCT = '/product',
  MY_PRODUCTS = '/my-products',
  ADDING_PRODUCTS = '/add',
}

export enum BREADCRUMB_KEYS {
  PRODUCTS = 'Products',
  MY_PRODUCTS = 'My products',
  INQUIRIES = 'Inquiries',
}

export enum CONTEXT_MENU_TITLES {
  LOG_IN = 'Log in',
  LOG_OUT = 'Log out',
}

export function GENERAL_MENU_ITEMS_NOT_LOGGED_IN(): NbMenuItem[] {
  return [
    {
      title: BREADCRUMB_KEYS.PRODUCTS,
      icon: ICONS.CUBE_OUTLINE,
      link: PRODUCTS_MENU_ITEM_URLS.PRODUCTS,
    },
  ];
}

export function GENERAL_MENU_ITEMS_LOGGED_IN(): NbMenuItem[] {
  return [
    {
      title: BREADCRUMB_KEYS.PRODUCTS,
      icon: ICONS.CUBE_OUTLINE,
      link: PRODUCTS_MENU_ITEM_URLS.PRODUCTS,
    },
    {
      title: BREADCRUMB_KEYS.MY_PRODUCTS,
      icon: ICONS.CUBE_OUTLINE,
      link: PRODUCTS_MENU_ITEM_URLS.MY_PRODUCTS,
    },
    {
      title: BREADCRUMB_KEYS.INQUIRIES,
      icon: ICONS.MESSAGE_SQUARE_OUTLINE,
      link: GENERAL_MENU_ITEM_URLS.INQUIRIES,
    }
  ];
}

export function LOGGED_OUT_CONTEXT_MENU_ITEMS(): NbMenuItem[] {
  return [
    {
      title: CONTEXT_MENU_TITLES.LOG_IN,
      link: GENERAL_MENU_ITEM_URLS.AUTHENTICATION,
      icon: ICONS.LOG_IN_OUTLINE,
    },
  ]
}

export function LOGGED_IN_CONTEXT_MENU_ITEMS(): NbMenuItem[] {
  return [
    {
      title: CONTEXT_MENU_TITLES.LOG_OUT,
      link: GENERAL_MENU_ITEM_URLS.AUTHENTICATION,
      icon: ICONS.LOG_OUT_OUTLINE,
    },
  ]
}

export enum LocalStorageEnum {
  TOKEN = 'TOKEN',
  USER = 'USER',
  SIDEBAR_MENU_ITEMS = 'SidebarMenuItems',
  CONTEXT_MENU_ITEMS = 'ContextMenuItems',
}

export enum SidebarMenuState {
  GENERAL_ITEMS_NOT_LOGGED_IN = 'GENERAL_ITEMS_NOT_LOGGED_IN',
  GENERAL_ITEMS_LOGGED_IN = 'GENERAL_ITEMS_LOGGED_IN',
}

export enum ContextMenuState {
  LOGGED_OUT = 'LOGGED_OUT',
  LOGGED_IN = 'LOGGED_IN'
}

export const isEmail = (email: string): boolean => {
  let regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
  return regexp.test(email);
}

export const isPassword = (password: string): boolean => {
  let regexp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
  return regexp.test(password);
}

export const isPhoneNumber = (phoneNumber: string): boolean => {
  let regexp = new RegExp("^\\+[0-9]+$");
  console.log(regexp.test(phoneNumber));
  console.log(phoneNumber);
  return regexp.test(phoneNumber);
}
