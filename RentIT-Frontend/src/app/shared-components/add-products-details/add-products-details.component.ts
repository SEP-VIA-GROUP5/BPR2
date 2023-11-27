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
  ADDING_PRODUCTS_TITLE, constructProductImagesFromImgurImages,
  defaultProduct,
  PERIOD
} from "src/app/shared-components/add-products-details/constants";
import {ICONS} from "src/app/constants";
import {AddProduct} from "src/app/products/adding-products/adding-products.actions";

@Component({
  selector: 'add-products-details',
  templateUrl: './add-products-details.component.html',
  styleUrls: ['./add-products-details.component.scss']
})
export class AddingProductsDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() uploadedImages: ImgurImageResponse[];
  @Output() onUploadImages: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  protected readonly STEPS = ADDING_PRODUCTS_STEP;
  protected readonly TITLES = ADDING_PRODUCTS_TITLE;
  protected readonly ICONS = ICONS;
  protected readonly PERIOD = PERIOD;

  selectedImages: File[] = [];
  productDetails: Product = defaultProduct;
  minLeasePeriodSelectedPeriod: PERIOD = PERIOD.DEFAULT;

  constructor() {
  }

  ngOnInit(): void {
    if (this.uploadedImages.length > 0) {
      this.productDetails.images = constructProductImagesFromImgurImages(this.uploadedImages);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.uploadedImages) {
      this.productDetails.images = constructProductImagesFromImgurImages(changes.uploadedImages.currentValue);
    }
  }

  onImageSelected(event) {
    this.selectedImages.push(...event.addedFiles);
  }

  onEventUploadImages() {
    // probably it needs to be sent something through emit(something)
    this.onUploadImages.emit(this.selectedImages);
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

  isSubmitButtonDisabled(): boolean {
    return this.productDetails.name === '' ||
      this.productDetails.description === '' ||
      this.productDetails.dayPrice === null ||
      this.productDetails.deposit === null ||
      this.productDetails.productValue === null ||
      this.productDetails.minLeasePeriod === null ||
      this.minLeasePeriodSelectedPeriod === PERIOD.DEFAULT ||
      // this.productDetails.images.length === 0 ||
      this.productDetails.tags.length === 0;
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

  ngOnDestroy(): void {
  }
}
