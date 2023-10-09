import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {Observable} from "rxjs";
import {LocalStorageService} from "src/core/services/local-storage.service";
import {LocalStorageEnum} from "src/app/constants";
import {Token} from "src/model/token";
import {ImgurImageResponse} from "src/model/imgurImageResponse";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ImgurApiService {
  imgurApiUrl = 'https://api.imgur.com/3/image';

  constructor(private http: HttpClient) {
  }

  post(path: string, image: File): Promise<Object> {
    const formData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Authorization': `Client-ID ${environment.imgur_api_client_id}`,
      'Accept': 'application/json'
    });
    return this.http.post(this.imgurApiUrl, formData, { headers }).toPromise();
  }
}
