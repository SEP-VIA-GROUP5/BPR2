import {Component, Input} from '@angular/core';
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product : Product;

  protected readonly ICONS = ICONS;

  getCardBySize() {
    return window.screen.width <= 472 ? 'small' : 'medium' ;
  }
}
