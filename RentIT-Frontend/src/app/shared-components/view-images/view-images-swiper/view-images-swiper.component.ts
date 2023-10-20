import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Image} from "src/model/image";
import {NgxSwiperConfig} from "ngx-image-swiper";
import {constructUrlsFromImages} from "src/app/shared-components/view-images/view-images-swiper/constants/constants";

@Component({
  selector: 'view-images-swiper',
  template: `
    <div class="image-swiper">
        <ngx-image-swiper [config]="swiperConfig" [images]="urlsImages"></ngx-image-swiper>
    </div>
  `,
  styleUrls: ['./view-images-swiper.component.scss']
})
export class ViewImagesSwiperComponent implements OnInit, OnChanges {
  @Input() images: Image[];
  urlsImages: string[];

  swiperConfig: NgxSwiperConfig = {
    navigationPlacement: 'inside',
    pagination: true,
    paginationPlacement: 'outside'
  };

  constructor() {
  }

  ngOnInit(): void {
    this.constructImagesInNgSliderImageS();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imgurImages) {
      this.constructImagesInNgSliderImageS();
    }
  }

  constructImagesInNgSliderImageS() {
    if (this.images) {
      this.urlsImages = constructUrlsFromImages(this.images);
    }
  }

}
