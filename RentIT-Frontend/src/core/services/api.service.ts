import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {environment} from '../../environments/environment.dev';
import {LocalStorageService} from 'src/core/services/local-storage.service';
import {LocalStorageEnum} from 'src/app/constants';
import {Token} from 'src/model/token';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  private getHeaders(tokenRequired: boolean): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (tokenRequired) {
      const token: Token = JSON.parse(this.localStorageService.getData(LocalStorageEnum.TOKEN));
      headers = headers.set('Authorization', `Bearer ${token.tokenBody}`);
    }
    console.log(headers);
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something went wrong. Please try again later.');
  }

  request(method: string, path: string, body: Object = {}, tokenRequired: boolean = false, params?: HttpParams): Observable<T> {
    const headers = this.getHeaders(tokenRequired);
    const request = new HttpRequest(method, `${environment.api_url}${path}`, body, {headers, params});
    return this.http.request<T>(request).pipe(
      filter((event: HttpEvent<T>): event is HttpResponse<T> => event instanceof HttpResponse),
      map((response: HttpResponse<T>) => response.body),
      catchError(this.handleError)
    );
  }


  async call(mockedReturned: T, apiCall: Observable<T>) {
    if (environment.mocked) {
      await this.delayIfMocked();
      return Promise.resolve(mockedReturned !== null ? mockedReturned : null);
    }
    return apiCall.toPromise();
  }

  async delayIfMocked() {
    if (environment.mocked) {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(2000);
    }
  }
}
