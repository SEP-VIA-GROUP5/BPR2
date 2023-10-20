import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";
import {ProductSelected} from "src/app/shared-components/product-card/constants/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'product',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product : Product;
  @Input() canPerformSelectProductAction: boolean;
  @Output() selectProduct: EventEmitter<any> = new EventEmitter<any>();

  isProductSelected: boolean = false;

  protected readonly ICONS = ICONS;

  constructor(private router: Router) {
  }

  // TODO product should be selected and the icon should be displayed with the fill out color
  // TODO should only select if an action is selected from the my-products page for example
  onClickProduct(): void {
    if (this.canPerformSelectProductAction) {
      this.isProductSelected = !this.isProductSelected;
      this.selectProduct.emit({
        isProductSelected: this.isProductSelected,
        product: this.product,
      } as ProductSelected);
    }
    else {
      this.router.navigate([`/product/${this.product.id}`]);
    }
  }

  getCardBySize() {
    return window.screen.width <= 472 ? 'small' : 'medium' ;
  }
}
