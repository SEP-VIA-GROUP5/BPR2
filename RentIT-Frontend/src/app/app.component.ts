import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {
  USER_MENU_ITEMS,
  ContextMenuState,
  GENERAL_MENU_ITEMS_LOGGED_IN,
  GENERAL_MENU_ITEMS_NOT_LOGGED_IN,
  ICONS,
  LocalStorageEnum,
  PRODUCTS_MENU_ITEM_URLS,
  SidebarMenuState
} from "src/app/constants";
import {filter, map, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {AppSelector, FetchLocalStorageData, UpdateContextMenuState} from "src/app/app.state";
import {UserService} from "src/api/user.service";
import {Logout} from "src/app/authentication/authentication.actions";
import {User} from "src/model/user";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ProductsByFilter, ProductsResetFilter} from "src/app/products/products/products.actions";
import {FilteringProductOptions} from "src/model/filteringProductOptions";

@Component({
  selector: 'app-root',
  template: `
      <nb-layout>
          <nb-layout-header>
              <div class="left-section">
                  <nb-icon [icon]="ICONS.LIST_OUTLINE" (click)="toggleSidebar()"></nb-icon>
              </div>

              <div class="center-section">
                  <search-bar *ngIf="isOnMainPage()" [icon]="ICONS.SEARCH"
                              (onSearchInput)="onSearchInput($event)"
                              (onFilteringOptionsChoose)="onFilteringOptionsChoose($event)"
                              (onResetFilteringOptions)="onResetFilteringOptions()"></search-bar>
              </div>

              <div class="right-section">
                  <img class="logo-image" src="../assets/logo.svg" alt="Logo" (click)="navigateToMainPage()"/>
                  <!--                   picture="user's profile" TODO fetch user's image inside <nb-user></nb-user>-->
                  <nb-user *ngIf="getUserFromLocalStorage() !== null"
                           [name]="getUserFromLocalStorage().firstName">
                  </nb-user>
                  <nb-user *ngIf="getUserFromLocalStorage() === null"
                           picture='https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
                           name='Not logged in'>
                  </nb-user>
              </div>
          </nb-layout-header>


          <nb-sidebar [responsive]="true">
              <div>
                  <nb-menu tag="menu" [items]="sidebarMenuItems">
                  </nb-menu>
              </div>
          </nb-sidebar>

          <nb-layout-column class="colored-column-basic">
              <router-outlet></router-outlet>
          </nb-layout-column>
      </nb-layout>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(AppSelector.sidebarMenuState)
  sidebarMenuState$: Observable<SidebarMenuState>;
  @Select(AppSelector.contextMenuState)
  contextMenuState$: Observable<ContextMenuState>;
  @Select(AppSelector.isFetching)
  isFetching$: Observable<boolean>;

  sidebarMenuItems: NbMenuItem[];
  sidebarVisible: boolean = true;
  protected readonly ICONS = ICONS;
  destroy$: Subject<boolean> = new Subject<boolean>();

  // //filtering
  // filteredOptionChose = FilteredOptionsEnum.DEFAULT;

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    public userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    let actionsInParallel = [
      new FetchLocalStorageData(),
      new UpdateContextMenuState(
        this.userService.isLoggedIn() ? ContextMenuState.LOGGED_IN : ContextMenuState.LOGGED_OUT
      )
    ];

    this.sidebarMenuState$.pipe(takeUntil(this.destroy$))
      .subscribe(sidebarMenuState => {
        this.sidebarMenuItems = this.getSidebarMenuItems(sidebarMenuState);
      })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'menu'),
        map(({item: {title, link}}) => ({title, link})),
      )
      .subscribe(({title, link}) => {
        // You can use the 'title' and 'link' variables here as needed
        if (title === USER_MENU_ITEMS.LOG_OUT) {
          this.store.dispatch(new Logout());
        } else {
          this.router.navigate([link]);
        }
      });

    this.store.dispatch([...actionsInParallel]);
  }

  toggleSidebar() {
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }

  getSidebarMenuItems(sidebarMenuState: SidebarMenuState) {
    switch (sidebarMenuState) {
      case SidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN:
        return GENERAL_MENU_ITEMS_NOT_LOGGED_IN();
      case SidebarMenuState.GENERAL_ITEMS_LOGGED_IN:
        return GENERAL_MENU_ITEMS_LOGGED_IN();
    }
  }

  getUserFromLocalStorage(): User {
    let userLocalStorage = this.localStorageService.getData(LocalStorageEnum.USER);
    return userLocalStorage !== "" ? JSON.parse(userLocalStorage) as User : null;
  }

  onFilteringOptionsChoose(filteringOptions: FilteringProductOptions) {
    this.store.dispatch(new ProductsByFilter(filteringOptions));
  }

  onResetFilteringOptions() {
    this.store.dispatch(new ProductsResetFilter());
  }

  onSearchInput(searchInput: string) {
    if(searchInput === "") {
      this.store.dispatch(new ProductsResetFilter());
    }
    this.store.dispatch(new ProductsByFilter({
      name: searchInput,
    } satisfies FilteringProductOptions));
}

  navigateToMainPage() {
    this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
  }

  isOnMainPage(): boolean {
    return this.router.routerState.snapshot.url === PRODUCTS_MENU_ITEM_URLS.PRODUCTS;
  }

  onContextChange(event) {
    console.log(event );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
