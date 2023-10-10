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
  dayPrice: null,
  weekPrice: null,
  monthPrice: null,
  deposit: null,
  city: '',
  productValue: null,
  minLeasePeriod: null,
  category: '',
  tag: [],
  images: [],
  productStatus: null,
  rentedUntil: null
}
