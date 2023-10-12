import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.dev';
import { LocalStorageService } from 'src/core/services/local-storage.service';
import { LocalStorageEnum } from 'src/app/constants';
import { Token } from 'src/model/token';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

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

  get(path: string, tokenRequired: boolean): Observable<T> {
    const headers = this.getHeaders(tokenRequired);
    return this.http.get<T>(`${environment.api_url}${path}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put(path: string, body: Object = {}): Observable<T> {
    const headers = this.getHeaders(false);
    return this.http.put<T>(`${environment.api_url}${path}`, JSON.stringify(body), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  post(path: string, body: Object = {}, tokenRequired: boolean): Observable<T> {
    const headers = this.getHeaders(tokenRequired);
    return this.http.post<T>(`${environment.api_url}${path}`, JSON.stringify(body), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(path: string): Observable<T> {
    const headers = this.getHeaders(false);
    return this.http.delete<T>(`${environment.api_url}${path}`, { headers }).pipe(
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
