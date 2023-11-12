export class FetchReceivedInquiries {
  static readonly type = '[Inquiries] Fetch received inquiries';
}

export class FetchSentInquiries {
  static readonly type = '[Inquiries] Fetch sent inquiries';
}

export class DeleteInquiry {
  static readonly type = '[Inquiries] Remove inquiry';

  constructor(public inquiryId: number) {
  }
}

export class ViewInquiry {
  static readonly type = '[Inquiries] View inquiry';

  constructor(public inquiryId: number) {
  }
}

export class ResetInquiry {
  static readonly type = '[Inquiries] Reset inquiry';
}
