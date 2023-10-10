import {ImgurImageResponse} from "src/model/imgurImageResponse";

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

export class ResetAddingProducts {
  static readonly type = '[Adding Products] Reset page';

  constructor() {
  }
}
