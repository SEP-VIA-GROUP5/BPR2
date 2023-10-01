import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {GENERAL_MENU_ITEMS, ICONS} from "src/app/constants";
import {filter, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuItems: NbMenuItem[] = GENERAL_MENU_ITEMS;
  items = [
    { title: 'Log in' },
  ];
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
