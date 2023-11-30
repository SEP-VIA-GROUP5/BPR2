import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Product} from "src/model/product";
import {ICONS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbDialogRef, NbDialogService, NbToastrService} from "@nebular/theme";
import {
  Action,
  ActionsConstants,
  computeRentedUntilDateWhenEditingStatus
} from "src/app/my-products/constants/actions.constants";
import {
  computeStatusSelectedListFromProducts,
  ProductSelected
} from "src/app/shared-components/product-card/constants/constants";
import {
  ChangeProductsStatus,
  EditProduct,
  MyProductsFetch,
  MyProductsReset,
  RemoveProducts
} from "src/app/my-products/my-products.actions";
import {Observable} from "rxjs";
import {MyProductsSelector} from "src/app/my-products/my-products.selector";
import {ProductStatus} from "src/model/productStatus";
import {isSameDay} from "src/core/utils/date.utils";
import {isBefore} from "date-fns";

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
  initialProductSelectedForEdit: Product;
  editedProduct: Product;

  // dialog actions
  @ViewChild('dialogAction') dialogAction: TemplateRef<any>;
  private dialogRef: NbDialogRef<any>;

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
        actionButtonText: this.actionSelected.actionButtonText,
        action: this.actionSelected.action,
      }
    })
    if(this.actionSelected.action === ActionsConstants.EDIT) {
      this.initialProductSelectedForEdit = {
        ...this.productsSelected[0].product
      };
      this.editedProduct = {
        ...this.initialProductSelectedForEdit
      };
    }
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
          actionButtonText: 'Remove',
        } satisfies Action;
        break;
      }
      case ActionsConstants.STATUS: {
        this.actionSelected = {
          action: ActionsConstants.STATUS,
          isButtonEnabled: true,
          status: 'warning',
          icon: ICONS.EDIT_2_OUTLINE,
          actionButtonText: 'Change status',
        } satisfies Action;
        break;
      }
      case ActionsConstants.EDIT: {
        this.actionSelected = {
          action: ActionsConstants.EDIT,
          isButtonEnabled: true,
          status: 'primary',
          icon: ICONS.EDIT_2_OUTLINE,
          actionButtonText: 'Edit product',
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
        rentedUntil: computeRentedUntilDateWhenEditingStatus(productSelected, this.actionSelected),
      });
    } else {
      this.productsSelected = this.productsSelected.filter(product => product.product.id !== productSelected.product.id);
    }
  }

  isRentedStatusSelected(productSelected: ProductSelected) {
    return productSelected.statusSelectedList.some(statusSelected => statusSelected.isStatusListSelected && statusSelected.productStatus === ProductStatus.RENTED);
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
    const isNotAStatusSelected = this.productsSelected.some(productSelected => productSelected.statusSelectedList.some(statusSelected => !statusSelected.isStatusListSelected));
    const isNotTheSameStatusAsBefore = this.isNotTheSameStatusAsBefore();
    return isNotAStatusSelected && isNotTheSameStatusAsBefore && this.isRentedUntilDateAfterTheAllowedOne();
  }

  private isNotTheSameStatusAsBefore(): boolean {
    const products: Product[] = this.store.selectSnapshot(MyProductsSelector.products);
    return this.productsSelected.some(productSelected => {
      const product = products.find(product => product.id === productSelected.product.id);
      return productSelected.statusSelectedList.some(statusSelected => statusSelected.isStatusListSelected && product.status !== statusSelected.productStatus);
    });
  }

  private isRentedUntilDateAfterTheAllowedOne(): boolean {
    return this.productsSelected.some(productSelected => {
      return productSelected.statusSelectedList.some(statusSelected => {
        if (statusSelected.isStatusListSelected && statusSelected.productStatus === ProductStatus.RENTED) {
          const rentedUntilDate = computeRentedUntilDateWhenEditingStatus(productSelected, this.actionSelected);
          return !isBefore(rentedUntilDate, productSelected.rentedUntil) || isSameDay(rentedUntilDate, productSelected.rentedUntil);
        }
        return false;
      });
    });
  }

  isButtonForPerformingActionDisabled(): boolean {
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        return this.productsSelected.length === 0;
      }
      case ActionsConstants.STATUS: {
        return (this.productsSelected.length === 0 || this.productsSelected.length > 5) || this.computeIsButtonDisabledForStatus();
      }
      case ActionsConstants.EDIT: {
        return this.productsSelected.length !== 1;
      }
    }
  }

  getButtonForPerformingTooltip(): string {
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        return 'Select at least one product to remove';
      }
      case ActionsConstants.STATUS: {
        if (this.productsSelected.length === 0) {
          return 'Select at least one product to change status';
        } else if (this.productsSelected.length > 5) {
          return 'Select maximum 5 products to change status';
        } else if (!this.isNotTheSameStatusAsBefore()) {
          return 'Select a different status for each product';
        } else if(this.isRentedUntilDateAfterTheAllowedOne()) {
          return 'Please select a date that is after the one allowed in the date picker';
        }
      }
      case ActionsConstants.EDIT: {
        if (this.productsSelected.length > 1) {
          return 'Select only one product to edit';
        } else if (this.productsSelected.length === 0) {
          return 'Select a product to edit';
        } else return '';
      }
    }

  }

  getProductGridClass(): string {
    const products = this.store.selectSnapshot(MyProductsSelector.products);
    if (products.length >= 1 && products.length <= 3) {
      return 'limited-products';
    }
    return '';
  }

  performAction(event?): void {
    let actionToPerform;
    switch (this.actionSelected.action) {
      case ActionsConstants.REMOVE: {
        actionToPerform = new RemoveProducts(this.productsSelected.map(product => product.product));
        break;
      }
      case ActionsConstants.STATUS: {
        actionToPerform = new ChangeProductsStatus(this.productsSelected);
        break;
      }
      case ActionsConstants.EDIT: {
        actionToPerform = new EditProduct(event);
      }
    }
    if (actionToPerform) {
      this.store.dispatch(actionToPerform);
      this.dialogRef.close();
    }
  }

  findIndexOfProductSelected(productSelectedId: number): number {
    return this.productsSelected.findIndex(productSelected => productSelected.product.id === productSelectedId);
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new MyProductsReset());
  }

}
