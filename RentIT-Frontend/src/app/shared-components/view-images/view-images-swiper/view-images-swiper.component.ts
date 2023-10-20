
import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {ImgurImageResponse} from "src/model/imgurImageResponse";
import {NgImageSliderComponent} from 'ng-image-slider';
import {NbWindowRef, NbWindowService} from "@nebular/theme";
import {Store} from "@ngxs/store";
import {UpdateImages} from "src/app/products/adding-products/adding-products.actions";
import {Image} from "src/model/image";
import {
  constructNgSliderImagesFromImages, constructNgSliderImagesFromImgurImages,
  findImgurImageResponseFromNgSliderImage,
  NgSliderImage
} from "src/app/shared-components/view-images/view-images-slider/constants/constants";

@Component({
  selector: 'view-images',
  template: `
    <div class="image-swiper">
      <ngx-image-swiper [config]="swiperConfig" [images]="images"></ngx-image-swiper>
    </div>
  `,
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesSliderComponent implements OnInit, OnChanges {
  @Input() imgurImages: ImgurImageResponse[];
  @Input() images: Image[];
  @Input() withSelectedImage: boolean = true;
  ngSliderImages: NgSliderImage[] = [];
  selectedImage: NgSliderImage;

  swiperConfig: NgxSwiperConfig = {
    navigationPlacement: 'inside',
    pagination: true,
    paginationPlacement: 'outside'
  };

  constructor(private windowService: NbWindowService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.constructImagesInNgSliderImageS();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imgurImages) {
      this.constructImagesInNgSliderImageS();
    }
  }

  onImageClick($event) {
    this.selectedImage = this.ngSliderImages[$event];
  }

  constructImagesInNgSliderImageS() {
    if (this.imgurImages) {
      this.ngSliderImages = constructNgSliderImagesFromImgurImages(this.imgurImages);
    }
    else if(this.images) {
      this.ngSliderImages = constructNgSliderImagesFromImages(this.images);
    }
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
