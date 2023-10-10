import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {
  CONTEXT_MENU_TITLES,
  ContextMenuState,
  GENERAL_MENU_ITEMS,
  ICONS, LocalStorageEnum, LOGGED_IN_CONTEXT_MENU_ITEMS,
  LOGGED_OUT_CONTEXT_MENU_ITEMS,
  SidebarMenuState
} from "src/app/constants";
import {filter, map, takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {AppSelector, UpdateContextMenuState} from "src/app/app.state";
import {UserService} from "src/api/user.service";
import {Logout} from "src/app/authentication/authentication.actions";
import {User} from "src/model/user";
import {LocalStorageService} from "src/core/services/local-storage.service";

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-header>
        <div class="left-section">
          <nb-icon [icon]="ICONS.LIST_OUTLINE" (click)="toggleSidebar()"></nb-icon>
        </div>

        <div class="center-section">
          <search-bar [icon]="ICONS.SEARCH"></search-bar>
        </div>

        <div class="right-section">
          <a href="">
            <img [src]="getImageBySize()" alt="Image" width="100%" height="auto"/>
          </a>
          <!--                   picture="user's profile" TODO fetch user's image-->
          <nb-user *ngIf="getUserFromLocalStorage() !== null"
                   [name]="getUserFromLocalStorage().firstName"
                   [nbContextMenu]="contextMenuItems"
                   nbContextMenuTag="my-context-menu">
          </nb-user>
          <nb-user *ngIf="getUserFromLocalStorage() === null"
                   picture='https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
                   name='Not logged in'
                   [nbContextMenu]="contextMenuItems"
                   nbContextMenuTag="my-context-menu">
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
  contextMenuItems: NbMenuItem[];
  protected readonly ICONS = ICONS;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    public userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
    @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.store.dispatch(new UpdateContextMenuState(
      this.userService.isLoggedIn() ? ContextMenuState.LOGGED_IN : ContextMenuState.LOGGED_OUT
    ));
    this.contextMenuState$.pipe(takeUntil(this.destroy$))
      .subscribe(contextMenuState => {
        this.contextMenuItems = this.getContextMenuItems(contextMenuState);
      })
    this.sidebarMenuState$.pipe(takeUntil(this.destroy$))
      .subscribe(sidebarMenuState => {
      this.sidebarMenuItems = this.getSidebarMenuItems(sidebarMenuState);
    })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title, link } }) => ({ title, link })),
      )
      .subscribe(({ title, link }) => {
        // You can use the 'title' and 'link' variables here as needed
        if(title === CONTEXT_MENU_TITLES.LOG_OUT) {
          this.store.dispatch(new Logout());
        }
        else {
          this.router.navigate([link]);
        }
        console.log(`Clicked menu item: ${title}, Link: ${link}`);
      });
  }

  toggleSidebar() {
    this.sidebarService.toggle(this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    return false;
  }

  getImageBySize() {
    return window.screen.width <= 472 ? 'assets/favicon.svg' : 'assets/logo.svg' ;
  }

  getSidebarMenuItems(sidebarMenuState: SidebarMenuState) {
    switch (sidebarMenuState) {
      case SidebarMenuState.GENERAL_ITEMS: return GENERAL_MENU_ITEMS();
    }
  }

  getContextMenuItems(contextMenuState: ContextMenuState) {
    switch (contextMenuState) {
      case ContextMenuState.LOGGED_OUT: return LOGGED_OUT_CONTEXT_MENU_ITEMS();
      case ContextMenuState.LOGGED_IN: return LOGGED_IN_CONTEXT_MENU_ITEMS();
    }
  }

  getUserFromLocalStorage(): User {
    let userLocalStorage = this.localStorageService.getData(LocalStorageEnum.USER);
    return userLocalStorage !== "" ? JSON.parse(userLocalStorage) as User : null;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
