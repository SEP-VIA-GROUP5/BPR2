import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import { ImgurImageResponse } from "src/model/imgurImageResponse";
import { NgImageSliderComponent } from 'ng-image-slider';
import {NbWindowRef, NbWindowService} from "@nebular/theme";
import {Store} from "@ngxs/store";
import {UpdateImages} from "src/app/products/adding-products/adding-products.actions";
import {
  constructNgSliderImagesFrom,
  findImgurImageResponseFromNgSliderImage,
  NgSliderImage
} from "src/app/shared-components/view-images/view-images-slider/constants/constants";

@Component({
  selector: 'view-images-slider',
  template: `
    <div class="slider-and-selected-container">
      <div class="view-image-container">
        <ng-image-slider [images]="ngSliderImages"
                         [autoSlide]="true"
                         [imageSize]="{width: '100%', height: 200}"
                         (imageClick)="onImageClick($event)"
                         #nav>
        </ng-image-slider>
      </div>
      <nb-card *ngIf="selectedImage" class="selected-image-container" size="tiny" [nbTooltip]="getTooltip()">
        <nb-card-header>
          <img [src]="selectedImage.image" [alt]="selectedImage.title" class="selected-image"/>
        </nb-card-header>
        <nb-card-body>
          <button (click)="onDeleteSelectedImage()" status="danger" size="medium" nbButton>Remove {{ selectedImage.title }}</button>
        </nb-card-body>
      </nb-card>
    </div>
  `,
  styleUrls: ['./view-images-slider.component.scss']
})
export class ViewImagesSliderComponent implements OnInit, OnChanges {
  @Input() imgurImages: ImgurImageResponse[];
  @Output() eventDeleteSelectedImage: EventEmitter<ImgurImageResponse[]> = new EventEmitter<ImgurImageResponse[]>();
  ngSliderImages: NgSliderImage[] = [];
  selectedImage: NgSliderImage;

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

  onDeleteSelectedImage() {
    let imgurImageSelected = findImgurImageResponseFromNgSliderImage(this.imgurImages, this.selectedImage);
    this.imgurImages = this.imgurImages.filter(image => image !== imgurImageSelected);
    this.selectedImage = null;
    this.eventDeleteSelectedImage.emit(this.imgurImages);
  }

  getTooltip() {
    return `You selected ${this.selectedImage.title}.`
  }

}
