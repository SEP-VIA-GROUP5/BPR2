import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Image} from "src/model/image";

export interface NgSliderImage {
  image: string;
  thumbImage: string;
  title: string;
  alt: string;
}

export function constructNgSliderImagesFromImgurImages(imgurImages: ImgurImageResponse[]) : NgSliderImage[] {
  return imgurImages.map(imgurImage => {
    return {
      image: imgurImage.data.link,
      thumbImage: imgurImage.data.link,
      title: imgurImage.data.title,
      alt: imgurImage.data.title,
    } satisfies NgSliderImage
  });
}

export function constructNgSliderImagesFromImages(images: Image[]): NgSliderImage[] {
  return images.map(image => {
    return {
      image: image.imageUrl,
      thumbImage: image.imageUrl,
      title: '',
      alt: '',
    } satisfies NgSliderImage
  });
}

export function findImgurImageResponseFromNgSliderImage(imgurImages: ImgurImageResponse[], ngSliderImage: NgSliderImage) : ImgurImageResponse {
  return imgurImages.find(imgurImage => {
    return imgurImage.data.link === ngSliderImage.image;
  });
}
