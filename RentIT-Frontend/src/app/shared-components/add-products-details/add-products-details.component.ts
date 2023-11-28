import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {Select, Store} from "@ngxs/store";
import {AddingProductsSelectors} from "src/app/products/adding-products/adding-products.selectors";
import {Observable} from "rxjs";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Product} from "src/model/product";
import {UserService} from "src/api/user.service";
import {NbTagComponent, NbTagInputAddEvent, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {
  ADDING_PRODUCTS_STEP,
  ADDING_PRODUCTS_TITLE, constructImgurImagesFromProductImages, constructProductImagesFromImgurImages,
  defaultProduct,
  PERIOD
} from "src/app/shared-components/add-products-details/constants";
import {ICONS} from "src/app/constants";
import {ImgurApiService} from "src/core/services/imgur.api.service";
import {environment} from "src/environments/environment.dev";

@Component({
  selector: 'add-products-details',
  templateUrl: './add-products-details.component.html',
  styleUrls: ['./add-products-details.component.scss']
})
export class AddingProductsDetailsComponent implements OnInit, OnDestroy {
  @Input() productDetails: Product = undefined;
  @Input() addingDetailsToCurrentProduct: boolean = false;
  @Output() onUploadImages: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  protected readonly STEPS = ADDING_PRODUCTS_STEP;
  protected readonly TITLES = ADDING_PRODUCTS_TITLE;
  protected readonly ICONS = ICONS;
  protected readonly PERIOD = PERIOD;

  isFetching: boolean = false;
  initialProductDetails: Product;
  uploadedImages: ImgurImageResponse[] = [];
  selectedImages: File[] = [];
  minLeasePeriodSelectedPeriod: PERIOD = PERIOD.DEFAULT;

  constructor(private imgurApiService: ImgurApiService,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    if (this.productDetails !== undefined) {
      this.uploadedImages = constructImgurImagesFromProductImages(this.productDetails.images);
      this.minLeasePeriodSelectedPeriod = this.substractCurrentLeasePeriod();
    } else {
      this.productDetails = defaultProduct;
    }
    this.initialProductDetails = {...this.productDetails};
  }

  onImageSelected(event) {
    this.selectedImages.push(...event.addedFiles);
  }

  async uploadImages() {
    let uploadedImages: ImgurImageResponse[] = [...this.uploadedImages];
    this.uploadedImages = [];
    this.isFetching = true;
    for (const image of this.selectedImages) {
      try {
        const uploadedImage = await this.imgurApiService.post(image);
        if (uploadedImage.status === 200) {
          uploadedImages.push(uploadedImage);
          this.toastrService.info(`Image '${image.name}' uploaded successfully!`, 'Success');
        } else {
          return this.toastrService.danger(
            environment.production ?
              'Please contact the administration' : 'Could not upload image',
            {icon: ICONS.ALERT_CIRCLE_OUTLINE}
          );
        }
      } catch (error) {
        return this.toastrService.danger(
          environment.production ? 'Please contact the administration' : error,
          'Something went wrong',
          {icon: ICONS.ALERT_CIRCLE_OUTLINE}
        );
      }
    }
    this.isFetching = false;
    this.uploadedImages = [...uploadedImages];
    this.productDetails = {
      ...this.productDetails,
      images: constructProductImagesFromImgurImages(this.uploadedImages)
    }
    this.selectedImages = [];
  }

  onEventSubmit() {
    this.productDetails.minLeasePeriod = this.constructMinLeasePeriod();
    this.onSubmit.emit(this.productDetails);
  }

  onTagRemove(tagToRemove: NbTagComponent) {
    this.productDetails.tags = this.productDetails.tags.filter(tag => tag !== tagToRemove.text);
  }

  onTagAdd({value, input}: NbTagInputAddEvent): void {
    if (value) {
      this.productDetails.tags.push(value)
    }
    input.nativeElement.value = '';
  }

  onDeleteSelectedImage(imgurImageResponses: ImgurImageResponse[]) {
    this.uploadedImages = imgurImageResponses;
  }

  getSubmitButtonTooltip = (): string => {
    if (this.isInitialProductEqualsTheEditedProduct()) {
      return 'You have not made any changes to the product';
    }
    else if (this.isSubmitButtonDisabled()) {
      return 'Please fill in all the details. The category, week and month price are optional.';
    }
    return '';
  }

  isSubmitButtonDisabled() {
    return this.productDetails.name === '' ||
      this.productDetails.description === '' ||
      this.productDetails.dayPrice === null ||
      this.productDetails.deposit === null ||
      this.productDetails.productValue === null ||
      this.productDetails.minLeasePeriod === null ||
      this.minLeasePeriodSelectedPeriod === PERIOD.DEFAULT ||
      this.productDetails.tags.length === 0;
  }

  isInitialProductEqualsTheEditedProduct() {
    return this.initialProductDetails.name === this.productDetails.name &&
      this.initialProductDetails.description === this.productDetails.description &&
      this.initialProductDetails.dayPrice === this.productDetails.dayPrice &&
      this.initialProductDetails.weekPrice === this.productDetails.weekPrice &&
      this.initialProductDetails.monthPrice === this.productDetails.monthPrice &&
      this.initialProductDetails.deposit === this.productDetails.deposit &&
      this.initialProductDetails.city === this.productDetails.city &&
      this.initialProductDetails.productValue === this.productDetails.productValue &&
      this.initialProductDetails.minLeasePeriod === this.productDetails.minLeasePeriod &&
      this.initialProductDetails.category === this.productDetails.category &&
      this.initialProductDetails.tags === this.productDetails.tags &&
      this.initialProductDetails.images === this.productDetails.images &&
      this.addingDetailsToCurrentProduct;
  }

  private constructMinLeasePeriod(): number {
    switch (this.minLeasePeriodSelectedPeriod) {
      case PERIOD.DAY:
        return this.productDetails.minLeasePeriod;
      case PERIOD.WEEK:
        return this.productDetails.minLeasePeriod * 7;
      case PERIOD.MONTH:
        return this.productDetails.minLeasePeriod * 30;
    }
  }

  substractCurrentLeasePeriod() {
    if (this.productDetails.minLeasePeriod / 7 === 0) {
      return PERIOD.WEEK;
    }
    if (this.productDetails.minLeasePeriod / 30 === 0) {
      return PERIOD.MONTH;
    }
    return PERIOD.DAY;
  }

  ngOnDestroy(): void {
  }
}
