import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-bar',
  template: `
    <ng-container>
      <nb-form-field>
        <input class="input-search" nbInput shape="round" placeholder="For example: GoPro" (input)="onInputChange($event)">
        <nb-icon nbSuffix pack="eva" [icon]="icon"></nb-icon>
      </nb-form-field>
    </ng-container>
  `,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() icon: string;

  onInputChange(event: any) {
    const typedValue = event.target.value;
    // TODO here the action for search will be called
  }
}
