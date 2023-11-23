import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token} from "src/model/token";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ContextMenuState, ICONS, LocalStorageEnum, PRODUCTS_MENU_ITEM_URLS, SidebarMenuState} from "src/app/constants";
import {DATE_FORMAT, DATE_LOCALE, DATE_TIMEZONE, isDateBeforeNow} from "src/core/utils/date.utils";
import {formatDate} from "@angular/common";
import {Store} from "@ngxs/store";
import {UpdateContextMenuState, UpdateSidebarMenuState} from "src/app/app.state";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {userMocked} from "src/mocks/user.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService<User | Token>,
    private localStorageService: LocalStorageService,
    private store: Store,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  PATH_CONTROLLER = 'user';

  async register(user: User) {
    let response = await this.apiService.call(null, this.apiService.request('post',`${this.PATH_CONTROLLER}/register`, user, false));
    this.toastrService.info(
      'You have been logged in successfully!',
      'Authentication',
      {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
    );
  }

  async login(user: User) {
    let token = await this.apiService.call(null, this.apiService.request('post',`${this.PATH_CONTROLLER}/login`, { email: user.email, password: user.password }, false));
    if (this.isTokenObject(token) && token) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(token));
      user = await this.apiService.call(userMocked, this.apiService.request('get',`${this.PATH_CONTROLLER}/getUser`, null,true)) as User;
      this.localStorageService.saveData(LocalStorageEnum.USER, JSON.stringify(user));
    }
    this.store.dispatch(new UpdateContextMenuState(ContextMenuState.LOGGED_IN));
    this.store.dispatch(new UpdateSidebarMenuState(SidebarMenuState.GENERAL_ITEMS_LOGGED_IN))
    await this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
    this.toastrService.info(
      'You have been logged in successfully!',
      'Authentication',
      {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
    );
    return token;
  }

  logout() {
    this.store.dispatch(new UpdateContextMenuState(ContextMenuState.LOGGED_IN));
    this.store.dispatch(new UpdateSidebarMenuState(SidebarMenuState.GENERAL_ITEMS_NOT_LOGGED_IN));
    // refresh user's token before clearing local storage
    this.apiService.call(null, this.apiService.request('get', `${this.PATH_CONTROLLER}/refresh`, null, true));
    this.localStorageService.clearData();
    window.location.reload();
  }

  isLoggedIn(): boolean {
    let tokenFromLocalStorage = this.localStorageService.getData(LocalStorageEnum.TOKEN);
    if (tokenFromLocalStorage === "") return false;

    let tokenParsed: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
    if (tokenParsed && tokenParsed.expires) {
      const expireDate = formatDate(new Date(tokenParsed.expires), DATE_FORMAT.YYYY_MM_DD_HH_MM_SS, DATE_LOCALE.EN_US, DATE_TIMEZONE.UTC);
      const isTokenNotExpired = isDateBeforeNow(new Date(expireDate));
      if(!isTokenNotExpired) this.logout();
      return isTokenNotExpired;
    }
    return false;
  }

  async getUser() {
    let user = await this.apiService.call(userMocked, this.apiService.request('get',`${this.PATH_CONTROLLER}/getUser`, null,true));
    return user;
  }

  redirectUserIfNotLoggedIn() {
    if (!this.isLoggedIn()) {
      this.toastrService.info(
        'You have been redirected to products page',
        'You need to be authenticated in order to see your products',
        {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE, duration: 5000}
      );
      this.router.navigate([PRODUCTS_MENU_ITEM_URLS.PRODUCTS]);
      return true;
    }
    return false;
  }

  private isTokenObject(obj: any): obj is Token {
    return (
      typeof obj === 'object' &&
      'tokenName' in obj &&
      'tokenBody' in obj &&
      'expires' in obj &&
      typeof obj.tokenName === 'string' &&
      typeof obj.tokenBody === 'string' &&
      typeof obj.expires === 'string'
    );
  }

  private isUserObject(obj: any): obj is User {
    return (
      typeof obj === 'object' &&
      'email' in obj &&
      'id' in obj &&
      'firstName' in obj &&
      'lastName' in obj &&
      'location' in obj &&
      'hashedPassword' in obj &&
      'password' in obj &&
      typeof obj.email === 'string' &&
      typeof obj.id === 'number' &&
      typeof obj.firstName === 'string' &&
      typeof obj.lastName === 'string' &&
      typeof obj.location === 'string' &&
      typeof obj.hashedPassword === 'string' &&
      typeof obj.password === 'string'
    );
  }
}
