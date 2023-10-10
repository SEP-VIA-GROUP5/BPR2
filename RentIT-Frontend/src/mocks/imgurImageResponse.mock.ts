import {ImgurImageResponse} from "src/model/imgurImageResponse";

export const imgurImageResponseMock: ImgurImageResponse[] = [
  {
    data: {
      id: '1',
      link: 'https://i.imgur.com/zNlCKDl.png',
      title: 'A mocked image'
    },
    success: true,
    status: 200,
  },
  {
    data: {
      id: '1',
      link: 'https://i.imgur.com/zNlCKD1.png',
      title: 'A mocked image'
    },
    success: true,
    status: 200,
  },
  {
    data: {
      id: '2',
      link: 'https://i.imgur.com/zNlCKDd.png',
      title: 'A mocked image'
    },
    success: true,
    status: 200,
  },
  {
    data: {
      id: '',
      link: 'https://i.imgur.com/zNlCKDb.png',
      title: 'A mocked image'
    },
    success: true,
    status: 200,
  },
  {
    data: {
      id: '4',
      link: 'https://i.imgur.com/zNlCKD3.png',
      title: 'A mocked image'
    },
    success: true,
    status: 200,
  }
];
