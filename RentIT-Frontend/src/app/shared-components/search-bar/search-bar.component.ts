import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  constructDefaultFilteringProductOptions,
  ProductPriceFilters,
} from "src/app/shared-components/search-bar/constants/constants";
import {ICONS} from "src/app/constants";
import {NbDialogRef, NbDialogService} from "@nebular/theme";
import {FilteringProductOptions} from "src/model/filteringProductOptions";
import {Select} from "@ngxs/store";
import {ProductsSelector} from "src/app/products/products/products.selector";
import {Observable} from "rxjs";
import {defaultProduct} from "src/app/products/adding-products/constants/constants";

@Component({
  selector: 'search-bar',
  templateUrl: `./search-bar.component.html`,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() icon: string;
  @Output() onSearchInput: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFilteringOptionsChoose: EventEmitter<FilteringProductOptions> = new EventEmitter<FilteringProductOptions>();
  @Output() onResetFilteringOptions: EventEmitter<FilteringProductOptions> = new EventEmitter<FilteringProductOptions>();
  filteringProductOptions: FilteringProductOptions = constructDefaultFilteringProductOptions();
  @ViewChild('moreFilteringOptionsAction') moreFilteringOptionsDialog: TemplateRef<any>;
  private dialogRef: NbDialogRef<any>;

  // redux selectors
  @Select(ProductsSelector.isListOnFiltering)
  isListOnFiltering$: Observable<boolean>;
  productPriceFilters: ProductPriceFilters[] = ['Deposit', 'Day price', 'Week price', 'Month price', 'Product value'];

  //constants
  protected readonly ICONS = ICONS;

  constructor(
    private dialogService: NbDialogService,
  ) {
  }

  onInputChange(event: any) {
    let value = (event.target as HTMLInputElement).value;
    this.onSearchInput.emit(value);
  }

  isSaveFilteringOptionsButtonEnabled() {
    return this.filteringProductOptions.name === '' &&
      this.filteringProductOptions.city === '' &&
      this.filteringProductOptions.depositFrom === null &&
      this.filteringProductOptions.depositTo === null &&
      this.filteringProductOptions.category === '' &&
      this.filteringProductOptions.dayPriceFrom === null &&
      this.filteringProductOptions.dayPriceTo === null &&
      this.filteringProductOptions.weekPriceFrom === null &&
      this.filteringProductOptions.weekPriceTo === null &&
      this.filteringProductOptions.monthPriceFrom === null &&
      this.filteringProductOptions.monthPriceTo === null &&
      this.filteringProductOptions.productValueFrom === null &&
      this.filteringProductOptions.productValueTo === null;
  }

  onSaveFilteringOptions() {
    this.onFilteringOptionsChoose.emit(this.filteringProductOptions);
    this.dialogRef.close();
  }

  onResetFiltering() {
    this.filteringProductOptions = constructDefaultFilteringProductOptions();
    this.onResetFilteringOptions.emit();
  }

  onClickMoreFilteringOptions() {
    this.dialogRef = this.dialogService.open(this.moreFilteringOptionsDialog);
  }

  getPriceValuesBasedOnPriceFilter(priceFilterType: ProductPriceFilters) {
    switch (priceFilterType) {
      case 'Deposit':
        return ['depositTo', 'depositFrom'];
      case 'Day price':
        return ['dayPriceTo', 'dayPriceFrom'];
      case 'Week price':
        return ['weekPriceTo', 'weekPriceFrom'];
      case 'Month price':
        return ['monthPriceTo', 'monthPriceFrom'];
      case 'Product value':
        return ['productValueTo', 'productValueFrom'];
    }
  }

  protected readonly defaultProduct = defaultProduct;
}
