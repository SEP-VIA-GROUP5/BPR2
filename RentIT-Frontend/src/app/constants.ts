import {NbMenuItem} from "@nebular/theme";
import {BreadcrumbItem} from "src/app/app.store";

export enum ICONS {
  CUBE_OUTLINE = 'cube-outline',
  FORWARD_ARROW_IOS = "arrow-ios-forward-outline",
  FORWARD_BACK_IOS = "arrow-ios-back-outline",
  SEARCH = 'search',
  ALERT_CIRCLE_OUTLINE = 'alert-circle-outline',
  MAP_OUTLINE = 'map-outline',
  LIST_OUTLINE = 'list-outline',
  ARROW_IOS_DOWNWARD_OUTLINE = "arrow-ios-downward-outline",
}

export enum GENERAL_MENU_ITEM_URLS {
  PRODUCTS = '/products',
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

export const GENERAL_BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    id: BREADCRUMB_KEYS.PRODUCTS,
    name: BREADCRUMB_KEYS.PRODUCTS,
    link: GENERAL_MENU_ITEM_URLS.PRODUCTS,
  }
]

