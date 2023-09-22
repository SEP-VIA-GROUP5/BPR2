import {Component, Input} from '@angular/core';
import {BreadcrumbItem} from "src/app/app.store";
import {GENERAL_BREADCRUMB_ITEMS} from "src/app/constants";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'breadcrumbs',
  template: `
    <ol class="breadcrumb">
      <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-i="index">
        <li class="breadcrumb-item">{{ breadcrumb.name }}</li>
      </ng-template>
      <!--          <li class="breadcrumb-item"><a href="#">Home</a></li>-->
      <!--          <li class="breadcrumb-item"><a href="#">Library</a></li>-->
      <!--          <li class="breadcrumb-item active" aria-current="page">Data</li>-->
    </ol>
  `,
  styles: [
    ``
  ],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: BreadcrumbItem[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    console.log(activatedRoute.snapshot.data['breadcrumb'])
  }
}
