import {Product} from "src/model/product";
import {ProductStatus} from "src/model/productStatus";

export interface StatusSelected {
  isStatusListSelected: boolean;
  productStatus: ProductStatus;
}

export interface ProductSelected {
  isProductSelected: boolean;
  statusSelectedList: StatusSelected[];
  // dedicated for product's status, this will be only used when setting product's status to RENTED
  rentedUntil?: Date;
  product: Product;
}

function getStatusAlreadySelected(status, product: Product) {
  return product.status === status;
}

export function computeStatusSelectedListFromProducts(products: Product): StatusSelected[] {
  let productStatuses: ProductStatus[] = Object.values(ProductStatus).map(status => status);
  return productStatuses.map(status => {
    return {
      isStatusListSelected: getStatusAlreadySelected(status, products),
      productStatus: status,
    }
  });
}
