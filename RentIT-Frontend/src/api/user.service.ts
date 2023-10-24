import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token} from "src/model/token";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ContextMenuState, ICONS, LocalStorageEnum, PRODUCTS_MENU_ITEM_URLS, SidebarMenuState} from "src/app/constants";
import {
  DATE_FORMAT,
  DATE_LOCALE,
  DATE_TIMEZONE, getMinutesBetweenDates,
} from "src/core/utils/date.utils";
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
  ) {
  }

  PATH_CONTROLLER = 'user';
  private isRefreshingToken: boolean = false;
  private currentRefreshPromise: Promise<any> | null = null;

  async register(user: User) {
    let response = await this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/register`, user, false));
    this.toastrService.info(
      'You have been logged in successfully!',
      'Authentication',
      {icon: ICONS.CHECKMARK_CIRCLE_OUTLINE}
    );
  }

  async login(user: User) {
    let token = await this.apiService.call(null, this.apiService.request('post', `${this.PATH_CONTROLLER}/login`, {
      email: user.email,
      password: user.password
    }, false));
    if (this.isTokenObject(token) && token) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(token));
      user = await this.apiService.call(userMocked, this.apiService.request('get', `${this.PATH_CONTROLLER}/getUser`, null, true)) as User;
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
    this.localStorageService.clearData();
    window.location.reload();
  }

  isLoggedIn(): boolean {
    let tokenFromLocalStorage = this.localStorageService.getData(LocalStorageEnum.TOKEN);
    // fail fast
    if (!tokenFromLocalStorage) return false;
    this.handleRefreshToken();
    return true;
  }

  async handleRefreshToken(): Promise<void> {
    let tokenParsed: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
    if (tokenParsed && tokenParsed.expires) {
      const expireDate = formatDate(new Date(tokenParsed.expires), DATE_FORMAT.YYYY_MM_DD_HH_MM_SS, DATE_LOCALE.EN_US, DATE_TIMEZONE.UTC);
      const minutesBetweenNowAndExpireDate = getMinutesBetweenDates(new Date(expireDate), new Date()) - 60;
      // we chose 50 because the token expires in an hour, so in the last 10 minutes, a new token has to be generated
      const tokenGeneratedMoreThan50MinutesAgo = minutesBetweenNowAndExpireDate >= 50;

      // don't perform any action if the token has not been generated more than 50 minutes ago
      if (!tokenGeneratedMoreThan50MinutesAgo) return;

      // wait for refresh token api call to be finished, if there's a request already in progress
      if (this.isRefreshingToken && this.currentRefreshPromise) {
        await this.currentRefreshPromise;
        return;
      }

      try {
        this.isRefreshingToken = true;

        this.localStorageService.clearDataByKeys([LocalStorageEnum.TOKEN]);
        this.currentRefreshPromise = this.apiService.call(null, this.apiService.request('get', `${this.PATH_CONTROLLER}/refresh`, null, true));

        let newToken = await this.currentRefreshPromise;
        if (this.isTokenObject(newToken) && newToken) {
          this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(newToken));
        }
      } finally {
        this.isRefreshingToken = false;
        this.currentRefreshPromise = null;
      }
    }
  }

  async getUser() {
    let user = await this.apiService.call(userMocked, this.apiService.request('get', `${this.PATH_CONTROLLER}/getUser`, null, true));
    return user;
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
