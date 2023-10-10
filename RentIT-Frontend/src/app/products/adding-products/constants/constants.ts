import {Product} from "src/model/product";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Image} from "src/model/image";

export enum ADDING_PRODUCTS_STEP {
  PICTURES = 'Pictures',
  DETAILS = 'Details',
}

export enum ADDING_PRODUCTS_TITLE {
  ADD_PICTURES = 'Add pictures',
  ADD_DETAILS = 'Add details',
}

export enum PERIOD {
  DEFAULT = '',
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
}

export const constructProductImagesFromImgurImages = (imgurImages: ImgurImageResponse[]) => {
  return imgurImages.map(imgurImage => {
    return {
      imageUrl: imgurImage.data.link
    } satisfies Image;
  });
};

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
