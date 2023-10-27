import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NbDialogRef, NbDialogService} from "@nebular/theme";

@Component({
  selector: 'stars-rating',
  template: `
      <div class="stars-rating-container"
           nbPopoverTrigger="hover"
           [nbPopover]="tooltip">
          <!--      todo add click and cursor pointer and open dialog for adding a new review when clicking on a star-->
          <!--      todo probably check if the user had this item in renting before-->
          <!--      todo when hovering, it should exact of rating and reviews-->
          <span *ngFor="let rating of constructedRatings; let i = index" class="rating-star"
                (mouseenter)="onHover(i)"
                (mouseleave)="onLeaveHover()"
          (click)="clickOnStar()">
        {{ rating }}
      </span>
      </div>
      <ng-template #tooltip>
          <div class="tooltip-container">
              <p><span> Exact rating:</span> {{this.rating}} <span>Reviews:</span> {{this.numberReviews}}</p>
              <p> Click on a star to add your rating </p>
          </div>
      </ng-template>
      <ng-template #addRatingDialog>
          <nb-card class="add-rating-dialog-container">
              <nb-card-header class="add-rating-dialog-header">
                  Add rating
              </nb-card-header>
              <nb-card-body class="add-rating-dialog-body">

              </nb-card-body>
          </nb-card>
      </ng-template>
  `,
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() numberReviews: number;
  @Output() clickOnStarEvent: EventEmitter<number> = new EventEmitter<number>();
  defaultRating: string[] = ['☆', '☆', '☆', '☆', '☆'];
  constructedRatings: string[] = [];
  filledOutRating: string = '★';

  // dialog adding review
  @ViewChild('addRatingDialog') addRatingDialog: TemplateRef<any>;
  private dialogRef: NbDialogRef<any>;

  ngOnInit() {
    this.constructRatingBasedOnRatingInput();
  }

  constructor(private router: Router,
              private nbDialogService: NbDialogService) {
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

  clickOnStar() {
    this.clickOnStarEvent.emit();
  }

  showTooltip() {
    return `Exact rating: ${this.rating}. Reviews: ${this.numberReviews} \n Click on a star to add rating`
  }
}
