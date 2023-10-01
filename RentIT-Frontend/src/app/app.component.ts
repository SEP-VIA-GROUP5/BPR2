import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {GENERAL_MENU_ITEMS, ICONS} from "src/app/constants";
import {filter, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProductsSelector} from "src/app/products/products.selector";
import {Observable} from "rxjs";
import {AppSelector, AppState} from "src/app/app.state";

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-header>
        <div class="left-section">
          <nb-icon [icon]="ICONS.LIST_OUTLINE" (click)="toggleSidebar()"></nb-icon>
          <i class="nb-menu"></i>
        </div>

        <div class="center-section">
          <search-bar [icon]="ICONS.SEARCH"></search-bar>
        </div>

        <div class="right-section">
          <a href="">
            <img [ngSrc]="getImageBySize()" alt="Image" width="100%" height="auto"/>
          </a>
          <nb-user name="Anonymous"
                   title="You are not logged"
                   [nbContextMenu]="contextMenu$ | async"
                   nbContextMenuTag="my-context-menu">
          </nb-user>
        </div>
      </nb-layout-header>


      <nb-sidebar [responsive]="true">
        <div>
          <nb-menu tag="menu" [items]="sidebarMenu$ | async"></nb-menu>
        </div>
      </nb-sidebar>

      <nb-layout-column class="colored-column-basic">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(AppSelector.sidebarMenu)
  sidebarMenu$: Observable<NbMenuItem[]>;
  @Select(AppSelector.sidebarMenu)
  contextMenu$: Observable<NbMenuItem[]>;

  sidebarVisible: boolean = true;
  protected readonly ICONS = ICONS;

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private router: Router) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.router.navigate(['/authentication']));
  }

  toggleSidebar() {
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }

  getImageBySize() {
    return window.screen.width <= 472 ? 'assets/favicon.svg' : 'assets/logo.svg' ;
  }
}
