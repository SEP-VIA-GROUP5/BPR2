import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {Product} from "src/model/product";
import {NbTagComponent, NbTagInputAddEvent, NbToastrService} from "@nebular/theme";
import {
  ADDING_PRODUCTS_STEP,
  ADDING_PRODUCTS_TITLE,
  constructImgurImagesFromProductImages,
  constructProductImagesFromImgurImages,
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
  productDetailsModel: Product = defaultProduct;
  initialProductDetailsModel: Product = defaultProduct;
  uploadedImages: ImgurImageResponse[] = [];
  selectedImages: File[] = [];
  minLeasePeriodSelectedPeriod: PERIOD = PERIOD.DEFAULT;
  isInitialProductEqualsTheEditedProduct: boolean = false;

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
    this.productDetailsModel = {...this.productDetails};
    this.initialProductDetailsModel = {...this.productDetailsModel};
    this.isInitialProductEqualsTheEditedProduct = this.constructInitialProductEqualsTheEditedProduct();
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
    this.productDetailsModel = {
      ...this.productDetailsModel,
      images: constructProductImagesFromImgurImages(this.uploadedImages)
    }
    this.selectedImages = [];
  }

  onEventSubmit() {
    this.productDetailsModel.minLeasePeriod = this.constructMinLeasePeriod();
    this.onSubmit.emit(this.productDetailsModel);
  }

  onTagRemove(tagToRemove: NbTagComponent) {
    this.productDetailsModel = {
      ...this.productDetailsModel,
      tags: this.productDetailsModel.tags.filter(tag => tag !== tagToRemove.text)
    };
    this.isInitialProductEqualsTheEditedProduct = this.constructInitialProductEqualsTheEditedProduct();
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.productDetailsModel = {
        ...this.productDetailsModel,
        tags: [...this.productDetailsModel.tags, value]
      };
    }
    input.nativeElement.value = '';
    this.isInitialProductEqualsTheEditedProduct = this.constructInitialProductEqualsTheEditedProduct();
  }

  onDeleteSelectedImage(imgurImageResponses: ImgurImageResponse[]) {
    this.uploadedImages = imgurImageResponses;
  }

  getSubmitButtonTooltip = (): string => {
    if (this.constructInitialProductEqualsTheEditedProduct()) {
      return 'You have not made any changes to the product';
    }
    else if (this.isSubmitButtonDisabled()) {
      return 'Please fill in all the details. The category, week and month price are optional.';
    }
    return '';
  }

  isSubmitButtonDisabled() {
    return this.productDetailsModel.name === '' ||
      this.productDetailsModel.description === '' ||
      this.productDetailsModel.dayPrice === null ||
      this.productDetailsModel.deposit === null ||
      this.productDetailsModel.productValue === null ||
      this.productDetailsModel.minLeasePeriod === null ||
      this.minLeasePeriodSelectedPeriod === PERIOD.DEFAULT ||
      this.productDetailsModel.tags.length === 0;
  }

  onInputType($event) {
    this.isInitialProductEqualsTheEditedProduct = this.constructInitialProductEqualsTheEditedProduct();
  }

  constructInitialProductEqualsTheEditedProduct() {
    return this.initialProductDetailsModel.name === this.productDetailsModel.name &&
      this.initialProductDetailsModel.description === this.productDetailsModel.description &&
      this.initialProductDetailsModel.dayPrice === this.productDetailsModel.dayPrice &&
      this.initialProductDetailsModel.weekPrice === this.productDetailsModel.weekPrice &&
      this.initialProductDetailsModel.monthPrice === this.productDetailsModel.monthPrice &&
      this.initialProductDetailsModel.deposit === this.productDetailsModel.deposit &&
      this.initialProductDetailsModel.city === this.productDetailsModel.city &&
      this.initialProductDetailsModel.productValue === this.productDetailsModel.productValue &&
      this.initialProductDetailsModel.minLeasePeriod === this.productDetailsModel.minLeasePeriod &&
      this.initialProductDetailsModel.category === this.productDetailsModel.category &&
      this.initialProductDetailsModel.tags === this.productDetailsModel.tags &&
      this.initialProductDetailsModel.images === this.productDetails.images &&
      this.addingDetailsToCurrentProduct;
  }

  private constructMinLeasePeriod(): number {
    switch (this.minLeasePeriodSelectedPeriod) {
      case PERIOD.DAY:
        return this.productDetailsModel.minLeasePeriod;
      case PERIOD.WEEK:
        return this.productDetailsModel.minLeasePeriod * 7;
      case PERIOD.MONTH:
        return this.productDetailsModel.minLeasePeriod * 30;
      default:
        return this.productDetailsModel.minLeasePeriod;
    }
  }

  substractCurrentLeasePeriod() {
    if (this.productDetailsModel.minLeasePeriod % 7 === 0) {
      return PERIOD.WEEK;
    }
    if (this.productDetailsModel.minLeasePeriod % 30 === 0) {
      return PERIOD.MONTH;
    }
    return PERIOD.DAY;
  }

  ngOnDestroy(): void {
  }
}
