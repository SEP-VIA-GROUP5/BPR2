import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token} from "src/model/token";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {ContextMenuState, GENERAL_MENU_ITEM_URLS, ICONS, LocalStorageEnum} from "src/app/constants";
import {DATE_FORMAT, DATE_LOCALE, DATE_TIMEZONE, isDateBeforeNow} from "src/core/utils/date.utils";
import {formatDate} from "@angular/common";
import {Store} from "@ngxs/store";
import {UpdateContextMenuState} from "src/app/app.state";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";

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
    let response = await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/register`, user));
    this.toastrService.info(
      'You have been logged in successfully!',
      'Authentication',
      {icon: ICONS.ALERT_CIRCLE_OUTLINE}
    );
  }

  async login(user: User) {
    let response = await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/login`, { email: user.email, password: user.password }));
    if (this.isTokenObject(response) && response) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(response));
      this.localStorageService.saveData(LocalStorageEnum.USER, JSON.stringify({ email: user.email } as User));
    }
    this.store.dispatch(new UpdateContextMenuState(ContextMenuState.LOGGED_IN));
    await this.router.navigate([GENERAL_MENU_ITEM_URLS.PRODUCTS]);
    this.toastrService.info(
      'You have been logged in successfully!',
      'Authentication',
      {icon: ICONS.ALERT_CIRCLE_OUTLINE}
    );
    return response;
  }

  logout() {
    this.store.dispatch(new UpdateContextMenuState(ContextMenuState.LOGGED_IN));
    this.localStorageService.clearData();
    window.location.reload();
  }

  isLoggedIn(): boolean {
    let tokenFromLocalStorage = this.localStorageService.getData(LocalStorageEnum.TOKEN);
    if (tokenFromLocalStorage === "") return false;

    let tokenParsed: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
    if (tokenParsed && tokenParsed.expires) {
      const expireDate = formatDate(new Date(tokenParsed.expires), DATE_FORMAT.YYYY_MM_DD_HH_MM_SS, DATE_LOCALE.EN_US, DATE_TIMEZONE.UTC);
      return isDateBeforeNow(new Date(expireDate));
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
}
