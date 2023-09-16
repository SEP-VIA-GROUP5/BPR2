// Example usage
import {Product} from "src/model/product";
import {mockedTags} from "src/mocks/tags.mock";

export const products: Product[] = [
  {
    productId: 1231,
    name: "GoPro",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    city: "Horsens",
    category: "Camera",
    tag: mockedTags[0]
  },
  {
    productId: 1233,
    name: "VW Jetta",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    city: "Horsens",
    category: "Car",
    tag: mockedTags[1]
  },
  {
    productId: 12334,
    name: "Yamaha",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    city: "Horsens",
    category: "Bike",
    tag: mockedTags[2]
  },
  {
    productId: 111,
    name: "Some nice boat",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    city: "Horsens",
    category: "Boat",
    tag: mockedTags[3]
  }
];
