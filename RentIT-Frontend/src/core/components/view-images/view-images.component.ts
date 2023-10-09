import { Component, Input } from '@angular/core';

@Component({
  selector: 'view-images',
  template: `
    view images works!
  `,
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent {
  @Input() icon: string;

}
