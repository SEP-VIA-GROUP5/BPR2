import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'stars-rating',
  template: `
      <div class="stars-rating-container"
           nbPopoverTrigger="hover"
           [nbTooltipDisabled]="!showTooltip"
           [nbPopover]="tooltip">
          <!--      todo add click and cursor pointer and open dialog for adding a new review when clicking on a star-->
          <!--      todo probably check if the user had this item in renting before-->
          <!--      todo when hovering, it should exact of rating and reviews-->
          <div *ngIf="enableClickEvent">
            <span [class.enableClicking]="enableClickEvent" *ngFor="let rating of constructedRatings; let i = index" class="rating-star"
                  (mouseenter)="onHover(i)"
                  (mouseleave)="onLeaveHover()"
                  (click)="clickOnStar(i+1)">
        {{ rating }}
      </span>
          </div>
          <div *ngIf="!enableClickEvent">
          <span [class.enableClicking]="enableClickEvent" *ngFor="let rating of constructedRatings; let i = index" class="rating-star">
        {{ rating }}
      </span>
          </div>
      </div>
      <ng-template #tooltip>
          <div class="tooltip-container">
            <p> <span *ngIf="this.rating"><span class="bold-font"> Exact rating:</span> {{ toFixedRating() }}.</span> <span *ngIf="this.reviewCount"><span class="bold-font"> Number of reviews: </span> {{ this.reviewCount }}</span> </p>
              <p> Click on a star to add your rating </p>
          </div>
      </ng-template>
  `,
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() reviewCount: number;
  @Input() enableClickEvent: boolean = true;
  @Input() showTooltip: boolean = true;
  @Output() clickOnStarEvent: EventEmitter<number> = new EventEmitter<number>();
  defaultRating: string[] = ['☆', '☆', '☆', '☆', '☆'];
  constructedRatings: string[] = [];
  filledOutRating: string = '★';

  ngOnInit() {
    this.constructRatingBasedOnRatingInput();
  }

  constructor(private router: Router) {
  }

  constructRatingBasedOnRatingInput() {
    if(!this.isValidInput()) {
      console.error('Invalid input for rating');
      return;
    }

    this.constructedRatings = [...this.defaultRating];
    for(let i = 0; i < this.rating; i++) {
      this.constructedRatings[i] = this.filledOutRating;
    }
  }

  constructRatingUntilIndex(starIndex: number) {
    this.constructedRatings = [...this.defaultRating];
      for(let i = 0; i <= starIndex; i++) {
        this.constructedRatings[i] = this.filledOutRating;
      }
  }

  isValidInput() {
    return this.rating >= 0 && this.rating <= 5;
  }

  onHover(starIndex: number) {
    this.constructRatingUntilIndex(starIndex);
  }

  onLeaveHover() {
    this.constructRatingBasedOnRatingInput();
  }

  toFixedRating() {
    return this.rating.toFixed(2);
  }

  clickOnStar(starsIndex: number) {
    this.clickOnStarEvent.emit(starsIndex);
  }
}
