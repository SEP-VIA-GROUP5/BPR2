import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Product} from "src/model/product";

export class UploadImage {
  static readonly type = '[Adding Products] Upload image via Imgur API';

  constructor(public image: File) {
  }
}

export class UpdateImages {
  static readonly type = '[Adding Products] Delete image from uploaded images';

  constructor(public images: ImgurImageResponse[]) {
  }
}

export class AddProduct {
  static readonly type = '[Adding Products] Add product';

  constructor(public product: Product) {
  }
}

export class ResetAddingProducts {
  static readonly type = '[Adding Products] Reset page';

  constructor() {
  }
}
