import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Image} from "src/model/image";
import {NgxSwiperConfig} from "ngx-image-swiper";
import {constructUrlsFromImages} from "src/app/shared-components/view-images/view-images-swiper/constants/constants";
import {NbDialogRef, NbDialogService} from "@nebular/theme";

@Component({
  selector: 'view-images-swiper',
  template: `
    <div class="image-swiper">
        <ngx-image-swiper [config]="swiperConfig" [images]="urlsImages" (imageClick)="onImageClick($event)"></ngx-image-swiper>
    </div>

    <ng-template #showImage let-data>
      <nb-card class="show-image-container">
        <nb-card-body class="show-image-body">
          <img class="image-showed" src="{{urlsImages[data.currentIndex]}}">
        </nb-card-body>
      </nb-card>
    </ng-template>
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

  //showing image dialog
  @ViewChild('showImage') showImage: TemplateRef<any>;
  private dialogRef: NbDialogRef<any>;

  constructor(private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.constructImagesInNgSliderImageS();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imgurImages) {
      this.constructImagesInNgSliderImageS();
    }
  }

  onImageClick(index: number) {
    this.dialogRef = this.dialogService.open(this.showImage, {
      context: {
        currentIndex: index
      }
    });
  }

  constructImagesInNgSliderImageS() {
    if (this.images) {
      this.urlsImages = constructUrlsFromImages(this.images);
    }
  }

}
