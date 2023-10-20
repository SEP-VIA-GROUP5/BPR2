import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class ProductModulePage implements OnInit, OnDestroy {
  alive = true;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
