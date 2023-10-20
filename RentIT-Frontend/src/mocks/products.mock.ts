import {Product} from "src/model/product";
import {mockedTags} from "src/mocks/tags.mock";
import {imagesMock} from "src/mocks/images.mock";
import {ProductStatus} from "src/model/productStatus";

// productId?: number;
// name: string;
// description?: string;
// dayPrice: number;
// weekPrice: number;
// monthPrice: number;
// deposit: number;
// city: string;
// productValue: number;
// minLeasePeriod?: number | null;
// category: string;
// tag: string[];
// images: Image[];
// productStatus: ProductStatus;
// rentedUntil?: string | null;
export const mockedProducts: Product[] = [
  {
    id: 1231,
    name: "GoPro",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    minLeasePeriod: 2,
    city: "Horsens",
    category: "Camera",
    tags: [mockedTags[0], mockedTags[1]],
    images: [imagesMock[1]],
    status: ProductStatus.AVAILABLE,
    productValue: 100,
    deposit: 10,
    rentedUntil: null
  },
  {
    id: 1233,
    name: "VW Jetta",
    description: "some description",
    dayPrice: 10.0,
    weekPrice: 50.0,
    monthPrice: 200.0,
    minLeasePeriod: 2,
    city: "Horsens",
    category: "Car",
    tags: [mockedTags[0], mockedTags[1]],
    images: [imagesMock[1]],
    status: ProductStatus.UNAVAILABLE,
    productValue: 100,
    deposit: 10,
    rentedUntil: null
  }
];
