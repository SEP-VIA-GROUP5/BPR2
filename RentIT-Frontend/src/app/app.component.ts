import { Component } from '@angular/core';
import {NbSidebarService} from "@nebular/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarVisible = true;

  constructor(private sidebarService: NbSidebarService) {
  }

  toggleSidebar() {
    // Toggle the sidebar state
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }
}
