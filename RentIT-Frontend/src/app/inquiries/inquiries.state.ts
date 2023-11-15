import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NbToastrService} from "@nebular/theme";
import {castDraft, produce} from "immer";
import {environment} from "src/environments/environment.dev";
import {ICONS} from "src/app/constants";
import {InquiryService} from "src/api/inquiry.service";
import {Inquiry} from "src/model/inquiry";
import {
  DeleteInquiry,
  FetchReceivedInquiries,
  FetchSentInquiries,
  ResetInquiry,
  ViewInquiry
} from "src/app/inquiries/inquiries.actions";

export interface InquiryStateModel {
  isFetching: boolean;
  receivedInquiries: Inquiry[];
  pageNumberReceivedInquiries: number;
  pageSizeReceivedInquiries: number;
  isLastPageReceivedInquiries: boolean;
  sentInquiries: Inquiry[];
  pageNumberSentInquiries: number;
  pageSizeSentInquiries: number;
  isLastPageSentInquiries: boolean;

}

export const defaultsState: InquiryStateModel = {
  isFetching: false,
  receivedInquiries: [],
  pageNumberReceivedInquiries: 1,
  pageSizeReceivedInquiries: 10,
  isLastPageReceivedInquiries: false,
  sentInquiries: [],
  pageNumberSentInquiries: 1,
  pageSizeSentInquiries: 10,
  isLastPageSentInquiries: false,
}

@State<InquiryStateModel>({
  name: 'inquiryPage',
  defaults: defaultsState,
})

@Injectable()
export class InquiryState {
  constructor(
    private toastrService: NbToastrService,
    private inquiryService: InquiryService,
  ) {
  }

  @Action(FetchReceivedInquiries)
  async fetchReceivedInquiries(
    {getState, setState}: StateContext<InquiryStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let newReceivedInquiries: Inquiry[] = [];
    try {
      newReceivedInquiries = await this.inquiryService.getReceivedInquiries(
        getState().pageNumberReceivedInquiries,
        getState().pageSizeReceivedInquiries,
      );
      newState = produce(getState(), draft => {
        let currentReceivedInquiries = [...draft.receivedInquiries];
        draft.receivedInquiries = [...currentReceivedInquiries, ...newReceivedInquiries];
        draft.isLastPageReceivedInquiries = newReceivedInquiries.length < draft.pageSizeReceivedInquiries;
        draft.pageNumberReceivedInquiries++;
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);
    }
  }

  @Action(FetchSentInquiries)
  async fetchSentInquiries(
    {getState, setState}: StateContext<InquiryStateModel>) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let newSentInquiries: Inquiry[] = [];
    try {
      newSentInquiries = await this.inquiryService.getMyInquiries(
        getState().pageNumberSentInquiries,
        getState().pageSizeSentInquiries);

      newState = produce(getState(), draft => {
        let currentSendInquiries = [...draft.sentInquiries];
        draft.sentInquiries = [...currentSendInquiries, ...newSentInquiries];
        draft.isLastPageSentInquiries = newSentInquiries.length < draft.pageSizeSentInquiries;
        draft.pageNumberSentInquiries++;
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);
    }
  }

  @Action(DeleteInquiry)
  async deleteInquiry(
    {getState, setState}: StateContext<InquiryStateModel>,
    action: DeleteInquiry) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    try {
      await this.inquiryService.deleteInquiry(action.inquiryId);
      newState = produce(getState(), draft => {
        draft.receivedInquiries = draft.receivedInquiries.filter(inquiry => inquiry.inquiryId !== action.inquiryId);
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);
    }
  }

  @Action(ViewInquiry)
  async viewInquiry(
    {getState, setState}: StateContext<InquiryStateModel>,
    action: ViewInquiry) {
    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    });
    setState(newState);

    try {
      await this.inquiryService.viewInquiry(action.inquiryId);
      newState = produce(getState(), draft => {
        draft.receivedInquiries = [...draft.receivedInquiries.map(inquiry => {
          if(inquiry.inquiryId === action.inquiryId) {
            inquiry.viewed = true;
            inquiry.viewedAt = new Date();
          }
          return inquiry;
        })]
        draft.isFetching = false;
      });
      return setState(newState);
    }
    catch (e) {
      this.toastrService.danger(
        environment.production ? 'Please contact the administration' : e,
        'Something went wrong',
        {icon: ICONS.ALERT_CIRCLE_OUTLINE}
      );
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      });
      return setState(newState);
    }
  }

  @Action(ResetInquiry)
  async resetInquiry(
    {getState, setState}: StateContext<InquiryStateModel>) {
    setState(defaultsState);
  }
}

