import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {ProductsReset} from "src/app/products/products.actions";
import {Product} from "src/model/product";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbDialogRef, NbDialogService, NbToastrService} from "@nebular/theme";
import {Action, ActionsConstants} from "src/app/my-products/constants/actions.constants";
import {mockedProducts} from "src/mocks/products.mock";
import {ProductSelected} from "src/app/shared-components/product/constants/constants";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {
  // actions
  actionSelected: Action = {
    action: ActionsConstants.DEFAULT,
    isButtonEnabled: false,
  };
  protected readonly ActionsConstants = ActionsConstants;
  productsSelected: Product[] = [];

  // dialog actions
  @ViewChild('dialogAction') dialogAction: TemplateRef<any>;
  private dialogRef: NbDialogRef<any>;
  // todo to be deleted
  protected readonly mockedProducts = mockedProducts;

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
        'You need to be authenticated in order to see your products',
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
    }
    // here dispatch my products based on user
  }

  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  // actions
  openActionDialog(): void {
    this.dialogRef = this.dialogService.open(this.dialogAction, {
      context: {
        title: `${this.actionSelected.action} confirmation`,
        bodyText: `You are about to delete ${this.productsSelected.length} products. Are you sure?`,
      }
    })
  }

  onSelectActionChanged(action: ActionsConstants) {
    switch (action) {
      case ActionsConstants.NOT_SELECTED: {
        this.actionSelected = {
          action: ActionsConstants.DEFAULT,
          isButtonEnabled: false,
        } satisfies Action;
        break;
      }
      case ActionsConstants.REMOVE: {
        this.actionSelected = {
          action: ActionsConstants.REMOVE,
          isButtonEnabled: true,
          status: 'danger',
          icon: ICONS.TRASH_2_OUTLINE,
        } satisfies Action;
        break;
      }
    }
    if (action !== ActionsConstants.NOT_SELECTED) {
      this.toastrService.info(
        `You have selected ${action} action`,
        `Select products to perform action`,
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
      );
    }
  }

  onSelectProduct(productSelected: ProductSelected) {
    if (productSelected.isProductSelected) {
      this.productsSelected.push(productSelected.product);
    } else {
      this.productsSelected = this.productsSelected.filter(product => product.productId !== productSelected.product.productId);
    }
  }

  getProductGridClass(): string {
    if (this.mockedProducts.length >= 1 && this.mockedProducts.length <= 3) {
      return 'limited-products';
    }
    return '';
  }

  performAction(): void {
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        // perform remove action with ngxs state
        break;
      }
    }
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new ProductsReset());
  }
}
