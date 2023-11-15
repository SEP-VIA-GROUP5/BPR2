import {Selector} from "@ngxs/store";
import {InquiryState, InquiryStateModel} from "src/app/inquiries/inquiries.state";

export class InquiriesSelector {
  @Selector([InquiryState])
  static isFetching(state: InquiryStateModel) {
    return state.isFetching;
  }

  @Selector([InquiryState])
  static receivedInquiries(state: InquiryStateModel) {
    return state.receivedInquiries;
  }

  @Selector([InquiryState])
  static pageNumberReceivedInquiries(state: InquiryStateModel) {
    return state.pageNumberReceivedInquiries;
  }

  @Selector([InquiryState])
  static pageSizeReceivedInquiries(state: InquiryStateModel) {
    return state.pageSizeReceivedInquiries;
  }

  @Selector([InquiryState])
  static isLastPageReceivedInquiries(state: InquiryStateModel) {
    return state.isLastPageReceivedInquiries;
  }

  @Selector([InquiryState])
  static sentInquiries(state: InquiryStateModel) {
    return state.sentInquiries;
  }

  @Selector([InquiryState])
  static pageNumberSentInquiries(state: InquiryStateModel) {
    return state.pageNumberSentInquiries;
  }

  @Selector([InquiryState])
  static pageSizeSentInquiries(state: InquiryStateModel) {
    return state.pageSizeSentInquiries;
  }

  @Selector([InquiryState])
  static isLastPageSentInquiries(state: InquiryStateModel) {
    return state.isLastPageSentInquiries;
  }
}
