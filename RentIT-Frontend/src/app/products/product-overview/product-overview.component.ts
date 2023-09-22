import {Component, Input} from '@angular/core';
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'appdad-product',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    console.log(activatedRoute.url);
    console.log(router.url);
  }
  getCardBySize() {
    return window.screen.width <= 472 ? 'small' : 'medium' ;
  }
}
