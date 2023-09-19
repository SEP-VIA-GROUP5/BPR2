import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.dev";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService<T> {
  constructor(private http: HttpClient) {
  }

  get(path: string): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
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
}
