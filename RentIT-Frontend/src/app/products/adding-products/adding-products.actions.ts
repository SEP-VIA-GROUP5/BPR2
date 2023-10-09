export class UploadImage {
  static readonly type = '[Adding Products] Upload image via Imgur API';

  constructor(public image: File) {
  }
}
