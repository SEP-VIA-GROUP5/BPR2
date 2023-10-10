import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {
  ADDING_PRODUCTS_STEP,
  ADDING_PRODUCTS_TITLE,
  defaultProduct
} from "src/app/products/adding-products/constants/constants";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {Select, Store} from "@ngxs/store";
import {UploadImage} from "src/app/products/adding-products/adding-products.actions";
import {Observable} from "rxjs";
import {AddingProductsSelectors} from "src/app/products/adding-products/adding-products.selectors";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Product} from "src/model/product";

@Component({
  selector: 'app-adding-products',
  templateUrl: './adding-products.component.html',
  styleUrls: ['./adding-products.component.scss']
})
export class AddingProductsComponent implements OnInit, OnDestroy {
  @Select(AddingProductsSelectors.isFetching)
  isFetching$: Observable<boolean>;
  @Select(AddingProductsSelectors.uploadedImages)
  uploadedImages$: Observable<ImgurImageResponse[]>

  protected readonly STEPS = ADDING_PRODUCTS_STEP;
  protected readonly TITLES = ADDING_PRODUCTS_TITLE;
  protected readonly ICONS = ICONS;

  selectedImages: File[] = [];
  productDetails: Product = defaultProduct;

  constructor(private userService: UserService,
              private toastrService: NbToastrService,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You need to be authenticated in order to add a product',
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
    }
  }

  onImageSelected(event: NgxDropzoneChangeEvent): void {
    this.selectedImages.push(...event.addedFiles);
  }

  async uploadImages(): Promise<void> {
    if (this.selectedImages.length === 0) {
      this.toastrService.warning(
        'Please select one or more images before saving.',
        'Error'
      );
      return;
    }

    for (const image of this.selectedImages) {
      this.store.dispatch(new UploadImage(image));
      this.toastrService.info(`Image '${image.name}' uploaded successfully!`, 'Success');
    }
    this.selectedImages = [];
  }

  ngOnDestroy(): void {
  }
}
