import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ICONS, PRODUCTS_MENU_ITEM_URLS} from "src/app/constants";
import {Router} from "@angular/router";
import {UserService} from "src/api/user.service";
import {NbDialogService, NbTabComponent, NbToastrService} from "@nebular/theme";
import {InquiriesTabs} from "src/app/inquiries/constants/constants";
import {
  DeleteInquiry,
  FetchReceivedInquiries,
  FetchSentInquiries,
  ResetInquiry,
  ViewInquiry
} from "src/app/inquiries/inquiries.actions";
import {InquiriesSelector} from "src/app/inquiries/inquiries.selector";
import {Observable} from "rxjs";
import {Inquiry} from "src/model/inquiry";

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit, OnDestroy {
  @Select(InquiriesSelector.isFetching)
  isFetching$: Observable<boolean>
  @Select(InquiriesSelector.receivedInquiries)
  receivedInquiries$: Observable<Inquiry[]>
  @Select(InquiriesSelector.pageNumberReceivedInquiries)
  pageNumberReceivedInquiries$: Observable<number>
  @Select(InquiriesSelector.pageSizeReceivedInquiries)
  pageSizeReceivedInquiries$: Observable<number>
  @Select(InquiriesSelector.isLastPageReceivedInquiries)
  isLastPageReceivedInquiries$: Observable<boolean>
  @Select(InquiriesSelector.sentInquiries)
  sentInquiries$: Observable<Inquiry[]>
  @Select(InquiriesSelector.pageNumberSentInquiries)
  pageNumberSentInquiries$: Observable<number>
  @Select(InquiriesSelector.pageSizeSentInquiries)
  pageSizeSentInquiries$: Observable<number>
  @Select(InquiriesSelector.isLastPageSentInquiries)
  isLastPageSentInquiries$: Observable<boolean>

  // constants
  protected readonly ICONS = ICONS;
  protected readonly InquiriesTabs = InquiriesTabs;

  alive: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.redirectUserIfNotLoggedIn();
  }

  onTabChanged(event: NbTabComponent) {
    switch (event.tabId) {
      case InquiriesTabs.RECEIVED: {
        let isOnFirstPage: boolean = this.store.selectSnapshot(InquiriesSelector.pageNumberReceivedInquiries) === 1;
        if (isOnFirstPage) {
          this.store.dispatch(new FetchReceivedInquiries());
        }
        break;
      }
      case InquiriesTabs.SENT: {
        let isOnFirstPage: boolean = this.store.selectSnapshot(InquiriesSelector.pageNumberSentInquiries) === 1;
        if (isOnFirstPage) {
          this.store.dispatch(new FetchSentInquiries());
        }
        break;
      }
    }
  }

  getTooltipTimestamp(inquiry: Inquiry): string {
   return inquiry.viewed ? `Viewed at ${inquiry.viewedAt}` : `This inquiry has not been viewed yet`;
  }

  onCollapsedChanged(isCollapsed, receivedInquiry: Inquiry) {
    if (!isCollapsed && !receivedInquiry.viewed) {
      this.store.dispatch(new ViewInquiry(receivedInquiry.inquiryId));
    }
  }

  onRemoveInquiry(receivedInquiry: Inquiry) {
    this.store.dispatch(new DeleteInquiry(receivedInquiry.inquiryId));
  }

  redirectToProduct(productId: number) {
    this.router.navigate([`${PRODUCTS_MENU_ITEM_URLS.PRODUCT}/${productId}`]);
  }

  loadNextInquiries(inquiryType: InquiriesTabs) {
    switch (inquiryType) {
      case InquiriesTabs.RECEIVED: {
        this.store.dispatch(new FetchReceivedInquiries());
        break;
      }
      case InquiriesTabs.SENT: {
        this.store.dispatch(new FetchSentInquiries());
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.store.dispatch(new ResetInquiry());
  }
}
