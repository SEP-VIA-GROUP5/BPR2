import { Injectable } from "@angular/core";
import { ApiService } from "src/core/services/api.service";
import { User } from "src/model/user";
import { Token } from "src/model/token";
import { LocalStorageService } from "src/core/services/local-storage.service";
import { LocalStorageEnum } from "src/app/constants";
import { isDateBeforeNow, toUTCDate } from "src/core/utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService<User | Token>,
    private localStorageService: LocalStorageService
  ) {}

  PATH_CONTROLLER = 'user';

  async register(user: User) {
    return await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/register`, user));
  }

  async login(user: User) {
    let response = await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/login`, { email: user.email, password: user.password }));
    if (this.isTokenObject(response) && response) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(response));
      this.localStorageService.saveData(LocalStorageEnum.USER, JSON.stringify({ email: user.email } as User));
    }
    return response;
  }

  logout() {
    this.localStorageService.clearData();
  }

  // TODO bug here
  isLoggedIn(): boolean {
    let token: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
    if (token && token.expires) {
      console.log(new Date(token.expires));
      console.log(token.expires);
      let dateString = token.expires;
      let dateParts = dateString.split(/[-T:.Z]/);
      let year = parseInt(dateParts[0]);
      let month = parseInt(dateParts[1]) - 1; // Months are zero-based (0 = January, 1 = February, etc.)
      let day = parseInt(dateParts[2]);
      let hour = parseInt(dateParts[3]);
      let minute = parseInt(dateParts[4]);
      let second = parseInt(dateParts[5]);
      let millisecond = parseInt(dateParts[6]);

      let date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
      console.log(date);
      // return isDateBeforeNow(expiresUTCDate);
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
