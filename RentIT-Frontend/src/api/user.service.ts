import {Injectable} from "@angular/core";
import {ApiService} from "src/core/services/api.service";
import {User} from "src/model/user";
import {Token} from "src/model/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService<User | Token>
  ) {
  }

  PATH_CONTROLLER = 'user';

  async register(user: User) {
    return await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/register`, user));
  }

  async login(user: User) {
    return await this.apiService.call(null, this.apiService.post(`${this.PATH_CONTROLLER}/login`, user));
  }
}
