import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token } from "src/model/token";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {LocalStorageEnum} from "src/constants";

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
    let response =  await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/login`, user));
    if (this.isTokenObject(response)) {
      this.localStorageService.saveData(LocalStorageEnum.TOKEN, JSON.stringify(response));
    }
    return response;
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
