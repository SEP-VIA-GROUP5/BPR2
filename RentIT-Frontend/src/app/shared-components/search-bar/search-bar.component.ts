import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilteredOptionsEnum} from "src/app/shared-components/search-bar/constants/constants";
import {ICONS} from "src/app/constants";

@Component({
  selector: 'search-bar',
  template: `
      <div class="search-bar-container">
          <nb-form-field class="form-input-search">
              <input [disabled]="selectedFilteredOption === FilteredOptionsEnum.DEFAULT" class="input-search" nbInput
                     shape="round" [placeholder]="getPlaceholderByFilteredOption()"
                     (input)="onInputChange($event)">
              <nb-icon nbPrefix pack="eva" [icon]="icon"></nb-icon>
          </nb-form-field>
          <nb-select placeholder="Filtered by" class="select-filtering-options" shape="round" status="primary" hero
                     (selectedChange)="onSelectChange($event)"
                     [(selected)]="selectedFilteredOption">
              <nb-option [value]="FilteredOptionsEnum.DEFAULT">
                  {{ FilteredOptionsEnum.DEFAULT }}
              </nb-option>
              <nb-option-group title="Filtered by">
                  <nb-option [value]="FilteredOptionsEnum.NAME">
                      {{ FilteredOptionsEnum.NAME }}
                  </nb-option>
                  <nb-option [value]="FilteredOptionsEnum.LOCATION">
                      {{ FilteredOptionsEnum.LOCATION }} </nb-option>
              </nb-option-group>
          </nb-select>
      </div>
  `,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() icon: string;
  @Output() onSearchInput: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFilteringChoose: EventEmitter<FilteredOptionsEnum> = new EventEmitter<FilteredOptionsEnum>();
  selectedFilteredOption: FilteredOptionsEnum = FilteredOptionsEnum.DEFAULT;

  //constants
  protected readonly FilteredOptionsEnum = FilteredOptionsEnum;
  protected readonly ICONS = ICONS;

  getPlaceholderByFilteredOption() {
    switch (this.selectedFilteredOption) {
      case FilteredOptionsEnum.NAME:
        return 'For example: GoPro';
      case FilteredOptionsEnum.LOCATION:
        return 'For example: London';
      case FilteredOptionsEnum.DEFAULT:
        return 'No filtered option chose';
    }
  }

  onSelectChange(selectedFilteringOption: FilteredOptionsEnum) {
    this.onFilteringChoose.emit(selectedFilteringOption);
  }

  onInputChange(event: any) {
    this.onSearchInput.emit((event.target as HTMLInputElement).value);
    // TODO here the action for search will be called
  }

}
