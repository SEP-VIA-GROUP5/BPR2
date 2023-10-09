export interface ImgurImageResponse {
  data: ImgurImageData;
  success: boolean;
  status: number;
}

export interface ImgurImageData {
  id: string;
  link: string;
}
