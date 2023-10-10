import {Product} from "src/model/product";

export enum ADDING_PRODUCTS_STEP {
  PICTURES = 'Pictures',
  DETAILS = 'Details',
}

export enum ADDING_PRODUCTS_TITLE {
  ADD_PICTURES = 'Add pictures',
  ADD_DETAILS = 'Add details',
}

export const defaultProduct: Product = {
  name: '',
  description: '',
  dayPrice: 0,
  weekPrice: 0,
  monthPrice: 0,
  deposit: 0,
  city: '',
  productValue: 0,
  minLeasePeriod: null,
  category: '',
  tag: [],
  images: [],
  productStatus: null,
  rentedUntil: null
}
