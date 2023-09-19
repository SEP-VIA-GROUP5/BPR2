import { Component } from '@angular/core';
import {NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {GENERAL_MENU_ITEMS, ICONS} from "src/app/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuItems: NbMenuItem[] = GENERAL_MENU_ITEMS;
  sidebarVisible: boolean = true;
  protected readonly ICONS = ICONS;

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService) {
  }

  toggleSidebar() {
    // Toggle the sidebar state
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }
}
