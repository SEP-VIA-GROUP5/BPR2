import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {ADDING_PRODUCTS_STEP, ADDING_PRODUCTS_TITLE} from "src/app/products/adding-products/constants/constants";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-adding-products',
  templateUrl: './adding-products.component.html',
  styleUrls: ['./adding-products.component.scss']
})
export class AddingProductsComponent implements OnInit, OnDestroy {
  protected readonly STEPS = ADDING_PRODUCTS_STEP;
  protected readonly TITLES = ADDING_PRODUCTS_TITLE;
  protected readonly ICONS = ICONS;

  selectedImages: File[] = [];

  constructor(private userService: UserService,
              private toastrService: NbToastrService,
              private router: Router) {
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

  ngOnDestroy(): void {
  }

  onImageSelected(event: NgxDropzoneChangeEvent): void {
    this.selectedImages = event.addedFiles;
  }

  async uploadImages(): Promise<void> {
    if (this.selectedImages.length === 0) {
      this.toastrService.warning(
        'Please select one or more images before saving.',
        'Error'
      );
      return;
    }

    // Loop through the selected images and handle the upload for each image.
    for (const image of this.selectedImages) {

      console.log(image);
      // Your image upload logic here for each image
      // Make sure to update the Imgur upload logic as mentioned earlier.
      // You can use a loop and make separate API requests for each image.

      // After successful upload of each image, you can show a success message.
      this.toastrService.info(`Image '${image.name}' uploaded successfully!`, 'Success');
    }
  }
}
