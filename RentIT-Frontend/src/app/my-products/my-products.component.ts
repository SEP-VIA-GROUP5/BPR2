import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbDialogRef, NbDialogService, NbToastrService} from "@nebular/theme";
import {Action, ActionsConstants} from "src/app/my-products/constants/actions.constants";
import {mockedProducts} from "src/mocks/products.mock";
import {
  computeStatusSelectedListFromProducts,
  ProductSelected
} from "src/app/shared-components/product-card/constants/constants";
import {MyProductsFetch, MyProductsReset, RemoveProducts} from "src/app/my-products/my-products.actions";
import {Observable} from "rxjs";
import {MyProductsSelector} from "src/app/my-products/my-products.selector";
import {ProductStatus} from "src/model/productStatus";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {
  @Select(MyProductsSelector.isFetching)
  isFetching$: Observable<boolean>
  @Select(MyProductsSelector.products)
  products$: Observable<Product[]>

  // actions
  actionSelected: Action = {
    action: ActionsConstants.DEFAULT,
    isButtonEnabled: false,
  };
  protected readonly ActionsConstants = ActionsConstants;
  productsSelected: ProductSelected[] = [];

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
    if (!this.userService.redirectUserIfNotLoggedIn()) {
      this.store.dispatch(new MyProductsFetch());
    }
  }

  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  // actions
  getBodyTextBasedOnAction() {
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        return `You are about to delete ${this.productsSelected.length} products. Are you sure?`;
      }
      case ActionsConstants.STATUS: {
        return `You are about to change status of ${this.productsSelected.length} products. Are you sure?`;
      }
    }
  }

  openActionDialog(): void {
    this.dialogRef = this.dialogService.open(this.dialogAction, {
      context: {
        title: `${this.actionSelected.action} confirmation`,
        status: this.actionSelected.status,
        bodyText: this.getBodyTextBasedOnAction(),
        action: this.actionSelected.action,
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
      case ActionsConstants.STATUS: {
        this.actionSelected = {
          action: ActionsConstants.STATUS,
          isButtonEnabled: true,
          status: 'warning',
          icon: ICONS.ALERT_CIRCLE_OUTLINE,
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
      this.productsSelected.push({
        product: productSelected.product,
        isProductSelected: productSelected.isProductSelected,
        statusSelectedList: computeStatusSelectedListFromProducts(productSelected.product),
      });
    } else {
      this.productsSelected = this.productsSelected.filter(product => product.product.id !== productSelected.product.id);
    }
  }

  changeStatus(product: Product, productStatus: ProductStatus) {
    this.productsSelected = this.productsSelected.map(productSelected => {
        if (productSelected.product.id === product.id) {
          productSelected.statusSelectedList = productSelected.statusSelectedList.map(statusSelected => {
              if (statusSelected.productStatus === productStatus && statusSelected.isStatusListSelected) {
                this.toastrService.info(
                  `You cannot change status to the same status`,
                  `Select another status`,
                  {icon: ICONS.ALERT_CIRCLE_OUTLINE}
                );
                return statusSelected;
              } else if (statusSelected.isStatusListSelected) {
                statusSelected.isStatusListSelected = false;
              } else if (statusSelected.productStatus === productStatus) {
                statusSelected.isStatusListSelected = !statusSelected.isStatusListSelected;
              }
              return statusSelected;
            }
          );
        }
        return productSelected;
      }
    );
  }

  private computeIsButtonDisabledForStatus(): boolean {
    const isAStatusSelected = this.productsSelected.some(productSelected => productSelected.statusSelectedList.some(statusSelected => statusSelected.isStatusListSelected));
    const products: Product[] = this.store.selectSnapshot(MyProductsSelector.products);
    const isNotTheSameStatusAsBefore = this.productsSelected.some(productSelected => {
      const product = products.find(product => product.id === productSelected.product.id);
      return productSelected.statusSelectedList.some(statusSelected => statusSelected.isStatusListSelected && product.status === statusSelected.productStatus);
    });
    return isAStatusSelected && !isNotTheSameStatusAsBefore;
  }

  isButtonForPerformingActionDisabled(): boolean {
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        return this.productsSelected.length === 0;
      }
      case ActionsConstants.STATUS: {
        return this.productsSelected.length === 0 || !this.computeIsButtonDisabledForStatus();
      }
    }
  }

  getProductGridClass(): string {
    if (this.mockedProducts.length >= 1 && this.mockedProducts.length <= 3) {
      return 'limited-products';
    }
    return '';
  }

  performAction(): void {
    let actionToPerform;
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        actionToPerform = new RemoveProducts(this.productsSelected.map(product => product.product));
        break;
      }
    }
    if (actionToPerform) {
      this.store.dispatch(actionToPerform);
      this.dialogRef.close();
    }
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new MyProductsReset());
  }

}
