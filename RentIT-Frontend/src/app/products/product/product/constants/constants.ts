import {Report} from "src/model/report";
import {Inquiry} from "src/model/inquiry";
import {toUTCDate} from "src/core/utils/date.utils";

export enum ReportType {
  USER = 'user',
  PRODUCT = 'product'
}

export interface ReportToAdd {
  productReport?: Report;
  userReport?: Report;
}

export function constructorReportToAdd(): ReportToAdd {
  return {
    productReport: {
      target: '',
      message: '',
    } satisfies Report,
    userReport: {
      target: '',
      message: '',
    } satisfies Report,
  } satisfies ReportToAdd;
}

export function constructorSendingInquiry(): Inquiry {
  return {
    message: '',
    productId: -1,
    senderPhoneNumber: '',
    senderEmail: '',
  } satisfies Inquiry;
}

export enum ButtonType {
  INQUIRY = 'inquiry',
  REVIEW = 'review',
}
