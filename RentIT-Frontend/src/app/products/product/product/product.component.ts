import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ICONS} from "src/app/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "src/api/user.service";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  productId: number;
  // constants
  protected readonly ICONS = ICONS;

  alive: boolean = true;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public userService: UserService,
  ) {
  }

  async ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
