import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "src/api/user.service";
import {NbToastrService} from "@nebular/theme";
import {GENERAL_MENU_ITEM_URLS, ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adding-products',
  templateUrl: './adding-products.component.html',
  styleUrls: ['./adding-products.component.scss']
})
export class AddingProductsComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You need to be authenticated in order to add a product',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
    }
  }

  ngOnDestroy(): void {
  }


}
