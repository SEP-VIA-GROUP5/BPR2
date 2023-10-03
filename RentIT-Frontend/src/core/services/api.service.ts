import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.dev";
import { Observable } from "rxjs";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {LocalStorageEnum} from "src/app/constants";
import {Token} from "src/model/token";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService<T> {
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  get(path: string, tokenRequired: boolean): Observable<T> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if(tokenRequired) {
      let token: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
        headers = headers.set('Authorization', ('Bearer '.concat(token.tokenBody)));
    }
    return this.http.get<T>(`${environment.api_url}${path}`, { headers });
  }

  put(path: string, body: Object = {}): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<T>(`${environment.api_url}${path}`, JSON.stringify(body), { headers });
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<T>(`${environment.api_url}${path}`, JSON.stringify(body), { headers });
  }

  delete(path: string): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<T>(`${environment.api_url}${path}`, { headers });
  }

  async call(mockedReturned: T, apiCall: Observable<T>)  {
    if (environment.mocked) {
      await this.delayIfMocked();
      return Promise.resolve(mockedReturned !== null ? mockedReturned  : null);
    }
    return apiCall.toPromise();
  }

  async delayIfMocked() {
    if(environment.mocked) {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);
    }
  }
}
