import {Report} from "src/model/report";

export enum TypeReport {
  USER = 'user',
  PRODUCT = 'product'
}

export interface ReportToAdd {
  productReport?: Report;
  userReport?: Report;
}

export enum SubmitButtonType {
  ADD_REVIEW = 'addReview',
  REPORT =  'report',
}

export const constructorReportToAdd = (): ReportToAdd => {
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
