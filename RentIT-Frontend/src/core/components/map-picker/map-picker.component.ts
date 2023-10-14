import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "src/environments/environment.dev";
import {ICONS} from "src/app/constants";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'map-picker',
  template: `
    <div class="map-picker-container">
      <div class="form-content">
        <input #locationInput class="location-input" [(ngModel)]="location" name="location" type="text" nbInput shape="round"
               placeholder="Location"
               (input)="onInputChange($event)"
               required>
        <button nbButton class="map-picker-button" status="primary" size="medium" shape="round" (click)="onButtonPressed()">{{ buttonTitle }}</button>
      </div>
      <p style="color:red"> You only need to insert the city where the item is located. </p>
      <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
        <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
      </agm-map>
    </div>
  `,
  styleUrls: [`map-picker.component.scss`],
})
export class MapPickerComponent implements OnInit, AfterViewInit {
  @Input() location: string;
  @Input() buttonTitle: string;
  @Output() buttonEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('locationInput', {static: false}) locationInput: ElementRef;
  lat: number = 55.8581302;
  lng: number = 9.8475881;
  zoom: number = 15;

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService,
  ) {
  }

  ngAfterViewInit(): void {
    this.locationInput.nativeElement.focus();
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  onButtonPressed() {
    //sends back the location
    this.buttonEvent.emit(this.location);
  }

  onInputChange(event: any) {
    switch (event.target.name) {
      case 'location': {
        this.updateLocation();
        break;
      }
    }
  }

  updateLocation() {
    if (this.location === '' || !this.location) {
      this.getCurrentLocation();
    }
    else {
      this.http
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${environment.google_api_key}`
        )
        .subscribe((data: any) => {
          if (data.results.length > 0) {
            const coordinates = data.results[0].geometry.location;
            this.lat = coordinates.lat;
            this.lng = coordinates.lng;
          }
        });
    }
  }


  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
