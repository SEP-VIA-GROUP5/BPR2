import {NbMenuItem} from "@nebular/theme";

export enum ICONS {
  CUBE_OUTLINE = 'cube-outline',
  CUBE_FILL = 'cube',
  FORWARD_ARROW_IOS = "arrow-ios-forward-outline",
  FORWARD_BACK_IOS = "arrow-ios-back-outline",
  SEARCH = 'search',
}
export enum GENERAL_MENU_ITEM_URLS {
  PRODUCTS = '/products',
}

export const GENERAL_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Products',
    icon: ICONS.CUBE_OUTLINE,
    link: GENERAL_MENU_ITEM_URLS.PRODUCTS,
  },
];

