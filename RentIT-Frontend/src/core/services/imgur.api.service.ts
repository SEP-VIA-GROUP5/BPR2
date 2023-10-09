import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.dev";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/core/services/local-storage.service";
import { LocalStorageEnum } from "src/app/constants";
import { Token } from "src/model/token";
import { ImgurImageResponse } from "src/model/imgurImageResponse";
import { catchError, delay, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImgurApiService {

  constructor(private http: HttpClient) {
  }

  postWithRetry(image: File): Promise<Object> {
    let headers = new HttpHeaders().set('Authorization', `Client-ID ${environment.imgur_api_client_id}`);

    // Create a new FormData object and append the image
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post('https://api.imgur.com/3/image', formData, { headers }).toPromise();
  }
}
