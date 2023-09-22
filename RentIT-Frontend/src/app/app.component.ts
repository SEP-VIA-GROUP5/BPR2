import { Component } from '@angular/core';
import {NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {GENERAL_MENU_ITEMS, ICONS} from "src/app/constants";
import {Select} from "@ngxs/store";
import {ProductsSelector} from "src/app/products/products.selector";
import {Observable} from "rxjs";
import {AppSelector, BreadcrumbItem} from "src/app/app.store";

@Component({
  selector: 'app-root',
  template: `
      <nb-layout>
          <nb-layout-header>
              <div class="left-section">
                  <a href="#" (click)="toggleSidebar()">
                      <nb-icon [icon]="ICONS.LIST_OUTLINE"></nb-icon>
                      <i class="nb-menu"></i>
                  </a>
                <breadcrumbs></breadcrumbs>
              </div>

              <div class="center-section">
                  <search-bar [icon]="ICONS.SEARCH"></search-bar>
              </div>

              <div class="right-section">
                  <a href="">
                      <img [src]="getImageBySize()" alt="Image" width="100%" height="auto"/>
                  </a>
              </div>
          </nb-layout-header>
          <nb-sidebar [responsive]="true">
              <div>
                  <nb-menu tag="menu" [items]="menuItems"></nb-menu>
              </div>
          </nb-sidebar>

          <nb-layout-column class="colored-column-basic">
              <router-outlet></router-outlet>
          </nb-layout-column>
      </nb-layout>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(AppSelector.breadcrumbItems)
  breadcrumbItems$: Observable<BreadcrumbItem[]>;

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

  getImageBySize() {
    return window.screen.width <= 472 ? 'assets/favicon.svg' : 'assets/logo.svg' ;
  }
}
