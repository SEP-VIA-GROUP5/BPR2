import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuBag, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {
  GENERAL_MENU_ITEMS_LOGGED_IN,
  GENERAL_MENU_ITEMS_NOT_LOGGED_IN,
  GeneralSidebarMenuState,
  ICONS,
  LocalStorageEnum,
  PRODUCTS_MENU_ITEM_URLS, TAG_MENU_ITEMS,
  USER_MENU_ITEMS,
  USER_MENU_ITEMS_LOGGED_IN,
  USER_MENU_ITEMS_NOT_LOGGED_IN,
  UserSidebarMenuState
} from "src/app/constants";
import {filter, map, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {
  AppSelector,
  FetchLocalStorageData,
  UpdateGeneralSidebarMenuState,
  UpdateUserSidebarMenuState
} from "src/app/app.state";
import {UserService} from "src/api/user.service";
import {Logout} from "src/app/authentication/authentication.actions";
import {User} from "src/model/user";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ProductsByFilter, ProductsResetFilter} from "src/app/products/products/products.actions";
import {FilteringProductOptions} from "src/model/filteringProductOptions";

@Component({
  selector: 'app-root',
  template: `
    <nb-layout windowMode>
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


      <nb-sidebar [responsive]="true" [containerFixed]="false">
        <div class="sidebar-container">
          <div class="menu-section general-menu-items">
            <nb-menu [tag]="TAG_MENU_ITEMS.GENERAL_MENU" [items]="generalSidebarMenuItems"></nb-menu>
          </div>
          <div class="menu-section user-menu-items">
            <nb-menu [tag]="TAG_MENU_ITEMS.USER_MENU" [items]="userSidebarMenuItems"></nb-menu>
          </div>
        </div>
      </nb-sidebar>

      <nb-layout-column class="colored-column-basic">
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(AppSelector.generalSidebarMenuState)
  generalSidebarMenuState$: Observable<GeneralSidebarMenuState>;
  @Select(AppSelector.userSidebarMenuState)
  userSidebarMenuState$: Observable<UserSidebarMenuState>;
  @Select(AppSelector.isFetching)
  isFetching$: Observable<boolean>;

  generalSidebarMenuItems: NbMenuItem[];
  userSidebarMenuItems: NbMenuItem[];
  currentSelectedItem: NbMenuBag;
  sidebarVisible: boolean = true;
  protected readonly ICONS = ICONS;
  protected readonly TAG_MENU_ITEMS = TAG_MENU_ITEMS;
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
      new UpdateUserSidebarMenuState(
        this.userService.isLoggedIn() ? UserSidebarMenuState.USER_ITEMS_LOGGED_IN : UserSidebarMenuState.USER_ITEMS_NOT_LOGGED_IN
      ),
      new UpdateGeneralSidebarMenuState(
        this.userService.isLoggedIn() ? GeneralSidebarMenuState.GENERAL_ITEMS_LOGGED_IN : GeneralSidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN
      )
    ];

    this.generalSidebarMenuState$.pipe(takeUntil(this.destroy$))
      .subscribe(sidebarMenuState => {
        this.generalSidebarMenuItems = this.getSidebarMenuItems(sidebarMenuState);
      })

    this.userSidebarMenuState$.pipe(takeUntil(this.destroy$))
      .subscribe(sidebarMenuState => {
        this.userSidebarMenuItems = this.getUserSideMenuItems(sidebarMenuState);
      });


    this.nbMenuService.onItemClick()
      .subscribe((item: NbMenuBag) => {
        // You can use the 'title' and 'link' variables here as needed
        if (item.tag === TAG_MENU_ITEMS.USER_MENU && item.item.title === USER_MENU_ITEMS.LOG_OUT) {
          this.store.dispatch(new Logout());
        } else {
          this.router.navigate([item.item.link]);
        }
        // handle update of selected variable inside menu item

        // deselecting previous selected item
        if (this.currentSelectedItem) {
         this.handleSelectionOfMenuItem(false, this.currentSelectedItem);
        }

        // selecting current selected item
        this.handleSelectionOfMenuItem( true, item)
        this.currentSelectedItem = item;
      });

    this.store.dispatch([...actionsInParallel]);
  }

  handleSelectionOfMenuItem(selected: boolean, item: NbMenuBag) {
    let indexOfCurrentSelectedItem;
    if (item.tag === TAG_MENU_ITEMS.USER_MENU) {
      indexOfCurrentSelectedItem = this.userSidebarMenuItems.findIndex(menuItem => menuItem.link === item.item.link);
      this.userSidebarMenuItems[indexOfCurrentSelectedItem].selected = selected;
    }
    if (item.tag === TAG_MENU_ITEMS.GENERAL_MENU) {
      indexOfCurrentSelectedItem = this.generalSidebarMenuItems.findIndex(menuItem => menuItem.link === item.item.link);
      this.generalSidebarMenuItems[indexOfCurrentSelectedItem].selected = selected;
    }
  }
  toggleSidebar() {
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }

  getSidebarMenuItems(sidebarMenuState: GeneralSidebarMenuState) {
    switch (sidebarMenuState) {
      case GeneralSidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN:
        return GENERAL_MENU_ITEMS_NOT_LOGGED_IN();
      case GeneralSidebarMenuState.GENERAL_ITEMS_LOGGED_IN:
        return GENERAL_MENU_ITEMS_LOGGED_IN();
    }
  }

  getUserSideMenuItems(userSidebarMenuState: UserSidebarMenuState) {
    switch (userSidebarMenuState) {
      case UserSidebarMenuState.USER_ITEMS_NOT_LOGGED_IN:
        return USER_MENU_ITEMS_NOT_LOGGED_IN();
      case UserSidebarMenuState.USER_ITEMS_LOGGED_IN:
        return USER_MENU_ITEMS_LOGGED_IN();
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
    if (this.currentSelectedItem) {
      this.handleSelectionOfMenuItem(false, this.currentSelectedItem);
    }
    // find the menu item for products
    let indexOfProductsMenuItem = this.generalSidebarMenuItems.findIndex(menuItem => menuItem.link === PRODUCTS_MENU_ITEM_URLS.PRODUCTS);
    let item = {
      tag: TAG_MENU_ITEMS.GENERAL_MENU,
      item: this.generalSidebarMenuItems[indexOfProductsMenuItem]
    } satisfies NbMenuBag;
    this.handleSelectionOfMenuItem( true, item)
    this.currentSelectedItem = item;

  }

  isOnMainPage(): boolean {
    return this.router.routerState.snapshot.url === PRODUCTS_MENU_ITEM_URLS.PRODUCTS;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
