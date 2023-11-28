import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Image} from "src/model/image";
import {Product} from "src/model/product";

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

export const constructImgurImagesFromProductImages = (images: Image[]) => {
  return images.map(image => {
    return {
      data: {
        id: image.id.toString(),
        link: image.imageUrl,
        title: `Image ${image.id}`
      },
      success: true,
      status: 200
    } satisfies ImgurImageResponse;
  });
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
  tags: [],
  images: [],
  status: null,
  rentedUntil: null
}
