import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import { ImgurImageResponse } from "src/model/imgurImageResponse";
import { NgImageSliderComponent } from 'ng-image-slider';
import {
  constructNgSliderImagesFrom, findImgurImageResponseFromNgSliderImage,
  NgSliderImage
} from "src/core/components/view-images/constants/constants";
import {NbWindowRef, NbWindowService} from "@nebular/theme";
import {Store} from "@ngxs/store";
import {UpdateImages} from "src/app/products/adding-products/adding-products.actions";

@Component({
  selector: 'view-images',
  template: `
    <div class="slider-and-selected-container">
      <div class="view-image-container">
        <ng-image-slider [images]="ngSliderImages"
                         [autoSlide]="true"
                         (imageClick)="onImageClick($event)"
                         #nav>
        </ng-image-slider>
      </div>
      <nb-card *ngIf="selectedImage" class="selected-image-container" size="tiny" [nbTooltip]="getTooltip()"
               (click)="openImage()">
        <nb-card-header>
          <img [src]="selectedImage.image" [alt]="selectedImage.title" class="selected-image"/>
        </nb-card-header>
      </nb-card>
    </div>

    <ng-template #selectedImageWindow let-data>
      <div class="selected-window">
        <img [src]="selectedImage.image" [alt]="selectedImage.title" class="window-selected-image"/>
        <button (click)="onDeleteSelectedImage()" status="danger" size="medium" nbButton>Remove {{ selectedImage.title }}</button>
      </div>
    </ng-template>
  `,
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit, OnChanges {
  @Input() imgurImages: ImgurImageResponse[];
  ngSliderImages: NgSliderImage[] = [];
  selectedImage: NgSliderImage;

  @ViewChild('selectedImageWindow') selectedImageWindow: TemplateRef<any>;
  windowRef: NbWindowRef;
  @ViewChild('nav') slider: NgImageSliderComponent;

  constructor(private windowService: NbWindowService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.ngSliderImages = constructNgSliderImagesFrom(this.imgurImages);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imgurImages) {
      this.ngSliderImages = constructNgSliderImagesFrom(changes.imgurImages.currentValue);
    }
  }

  onImageClick($event) {
    this.selectedImage = this.ngSliderImages[$event];
  }

  openImage() {
    this.windowRef = this.windowService.open(
      this.selectedImageWindow,
      { title: this.selectedImage.title },
    );
  }

  onDeleteSelectedImage() {
    let imgurImageSelected = findImgurImageResponseFromNgSliderImage(this.imgurImages, this.selectedImage);
    this.imgurImages = this.imgurImages.filter(image => image !== imgurImageSelected);
    this.store.dispatch(new UpdateImages(this.imgurImages));
    this.selectedImage = null;
    this.windowRef.close();

  }

  getTooltip() {
    return `You selected ${this.selectedImage.title}. Click to view it in full screen.`
  }

}
