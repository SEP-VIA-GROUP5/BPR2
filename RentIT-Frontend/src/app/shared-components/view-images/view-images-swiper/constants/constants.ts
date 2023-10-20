import {Image} from "src/model/image";

export function constructUrlsFromImages(images: Image[]): string[] {
  return images.map(image => {
    return image.imageUrl;
  });
}
