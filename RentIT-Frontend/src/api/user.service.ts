import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token } from "src/model/token";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {LocalStorageEnum} from "src/app/constants";
import {isDateBeforeNow} from "src/core/utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService<User | Token>,
    private localStorageService: LocalStorageService
  ) {
  }

  PATH_CONTROLLER = 'user';

  async register(user: User) {
    return await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/register`, user));
  }

  async login(user: User) {
    let response = this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/login`, user));
    if (this.isTokenObject(response) && response) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(response));
      this.localStorageService.saveData(LocalStorageEnum.USER, JSON.stringify({email: user.email} as User));
    }
    return response;
  }

  logout() {
    this.localStorageService.saveData(LocalStorageEnum.TOKEN, null);
    this.localStorageService.saveData(LocalStorageEnum.USER, null);
  }

  isLoggedIn() : boolean {
    let token : Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
    return isDateBeforeNow(new Date(token.expires)) && true;
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
