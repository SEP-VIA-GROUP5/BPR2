import {ImgurImageResponse} from "src/model/imgurImageResponse";

export interface NgSliderImage {
  image: string;
  thumbImage: string;
  title: string;
}

export function constructNgSliderImagesFrom(imgurImages: ImgurImageResponse[]) : NgSliderImage[] {
  return imgurImages.map(imgurImage => {
    return {
      image: imgurImage.data.link,
      thumbImage: imgurImage.data.link,
      title: imgurImage.data.title,
    } satisfies NgSliderImage
  });
}

export function findImgurImageResponseFromNgSliderImage(imgurImages: ImgurImageResponse[], ngSliderImage: NgSliderImage) : ImgurImageResponse {
  return imgurImages.find(imgurImage => {
    return imgurImage.data.link === ngSliderImage.image;
  });
}
