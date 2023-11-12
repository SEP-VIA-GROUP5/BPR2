import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {MyProductsFetch, MyProductsReset} from "src/app/my-products/my-products.actions";

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit, OnDestroy {
  // constants
  protected readonly ICONS = ICONS;

  alive: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You need to be authenticated in order to see your inquiries',
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE, duration: 5000}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
    }
    else {
      this.store.dispatch(new MyProductsFetch());
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new MyProductsReset());
  }
}
