import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {ImgurImageResponse} from "src/model/imgurImageResponse";

@Injectable({
  providedIn: 'root'
})
export class ImgurApiService {

  constructor(private http: HttpClient) {
  }

  post(image: File): Promise<ImgurImageResponse> {
    let headers = new HttpHeaders().set('Authorization', `Client-ID ${environment.imgur_api_client_id}`);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', image.name);

    return this.http.post<ImgurImageResponse>('https://api.imgur.com/3/image', formData, { headers }).toPromise();
  }
}
