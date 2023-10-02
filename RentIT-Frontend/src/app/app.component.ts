import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {GENERAL_MENU_ITEMS, ICONS, NOT_LOGGED_IN_CONTEXT_MENU} from "src/app/constants";
import {filter, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProductsSelector} from "src/app/products/products.selector";
import {Observable} from "rxjs";
import {AppSelector} from "src/app/app.state";
import {UserService} from "src/api/user.service";

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
            <img [src]="getImageBySize()" alt="Image" width="100%" height="auto"/>
          </a>
          <nb-user *ngIf="!(isFetching$ | async)" name="Nikita Poltoratsky"
                   title="full-stack developer"
                   [nbContextMenu]="getContextMenu()"
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
  @Select(AppSelector.isFetching)
  isFetching$: Observable<boolean>;

  sidebarVisible: boolean = true;
  protected readonly ICONS = ICONS;

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private userService: UserService,
    private router: Router,
    private store: Store,
    @Inject(NB_WINDOW) private window) {
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

  getContextMenu() {
    return this.userService.isLoggedIn() ? [] : NOT_LOGGED_IN_CONTEXT_MENU;
  }

  getImageBySize() {
    return window.screen.width <= 472 ? 'assets/favicon.svg' : 'assets/logo.svg' ;
  }
}
