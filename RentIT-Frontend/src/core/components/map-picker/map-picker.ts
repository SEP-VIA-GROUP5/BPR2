import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from "src/environments/environment.dev";
import {ICONS} from "src/app/constants";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'map-picker',
  template: `
    <form [formGroup]="locationForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="location" placeholder="Enter location">
      <button type="submit">Search</button>
    </form>
    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
      <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
    </agm-map>
  `,
  styles: [`
  agm-map {
    height:200px;
  }`],
})
export class MapPickerComponent implements OnInit {
  lat: number = 55.8581302;
  lng: number = 9.8475881;
  zoom: number = 15;

  locationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
  ) {
    this.locationForm = this.formBuilder.group({
      location: [''],
    });
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  onSubmit() {
    const location = this.locationForm.value.location;
    const apiKey = environment.google_api_key;

    this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`
      )
      .subscribe((data: any) => {
        if (data.results.length > 0) {
          const coordinates = data.results[0].geometry.location;
          this.lat = coordinates.lat;
          this.lng = coordinates.lng;
        }
      });
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 15;
        },
        (error) => {
          let message = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'You denied the request for geo location.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message = 'The request to get user location timed out.';
              break;
          }
          this.toastrService.info(
            message,
            'The location will be set default',
            {icon: ICONS.MAP_OUTLINE}
          );
        }
      );
    } else {
      this.toastrService.info(
        'Geolocation is not available in this browser',
        'The location will be set default',
        {icon: ICONS.MAP_OUTLINE}
      );
    }
  }
}
