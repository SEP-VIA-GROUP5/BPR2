import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  constructDefaultFilteringProductOptions,
} from "src/app/shared-components/search-bar/constants/constants";
import {ICONS} from "src/app/constants";
import {NbDialogRef, NbDialogService} from "@nebular/theme";
import {FilteringProductOptions} from "src/model/filteringProductOptions";

@Component({
  selector: 'search-bar',
  template: `
      <div class="search-bar-container">
          <nb-form-field class="form-input-search">
              <input [(ngModel)]="filteringProductOptions.productName" class="input-search" nbInput
                     shape="round" placeholder="Name, for example: GoPro"
                     (input)="onInputChange($event)">
              <nb-icon nbPrefix pack="eva" [icon]="icon"></nb-icon>
          </nb-form-field>
          <button class="select-filtering-options" nbButton shape="round" status="primary" hero
                  (click)="onClickMoreFilteringOptions()">
              More filtering options
          </button>
          <button *ngIf="resetFilteringButtonShown()" class="reset-filtering-options" nbButton shape="round"
                  status="warning" hero
                  (click)="onResetFiltering()">
              Reset filtering options
          </button>
      </div>

      <ng-template #moreFilteringOptionsAction>
          <nb-card class="more-filtering-options-container">
              <nb-card-header class="more-filtering-options-header">
                  More filtering options
              </nb-card-header>
              <nb-card-body class="more-filtering-options-body">
                  <div class="left-container">
                      <nb-form-field class="product-name-filtering">
                          <input [(ngModel)]="filteringProductOptions.productName" nbInput shape="round"
                                 placeholder="Name">
                      </nb-form-field>
                  </div>
                  <div class="right-container">
                      <nb-form-field class="product-category-filtering">
                          <input [(ngModel)]="filteringProductOptions.productCity" nbInput shape="round"
                                 placeholder="Location">
                      </nb-form-field>
                  </div>
              </nb-card-body>
              <nb-card-footer class="more-filtering-options-footer">
                  <button [disabled]="isSaveFilteringOptionsButtonEnabled()" nbButton shape="round" status="primary"
                          hero
                          (click)="onSaveFilteringOptions()">
                      Search
                  </button>
              </nb-card-footer>
          </nb-card>
      </ng-template>
  `,
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

  //constants
  protected readonly ICONS = ICONS;

  constructor(
    private dialogService: NbDialogService,
  ) {
  }

  onInputChange(event: any) {
    this.onSearchInput.emit((event.target as HTMLInputElement).value);
  }

  isSaveFilteringOptionsButtonEnabled() {
    return this.filteringProductOptions.productName === '' &&
      this.filteringProductOptions.productCity === '';
  }

  onSaveFilteringOptions() {
    this.onFilteringOptionsChoose.emit(this.filteringProductOptions);
    this.dialogRef.close();
  }

  resetFilteringButtonShown() {
    return this.filteringProductOptions.productName !== '' ||
      this.filteringProductOptions.productCity !== '';
  }

  onResetFiltering() {
    this.filteringProductOptions = constructDefaultFilteringProductOptions();
    this.onResetFilteringOptions.emit();
  }

  onClickMoreFilteringOptions() {
    this.dialogRef = this.dialogService.open(this.moreFilteringOptionsDialog);
  }

}
