import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";
import {ProductSelected} from "src/app/shared-components/product-card/constants/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'stars-rating',
  template: `
    this works wow
  `,
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent {

  constructor(private router: Router) {
  }

}
