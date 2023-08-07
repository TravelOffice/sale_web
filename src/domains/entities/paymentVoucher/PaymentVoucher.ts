export enum PaymentVoucherStatus {
  WAIT_FOR_APPROVAL = 'WAIT_FOR_APPROVAL',
  APPROVED = 'APPROVED',
  WAIT_FOR_SIGN = 'WAIT_FOR_SIGN',
  SIGNED = 'SIGNED',
  WAIT_FOR_TRANSFER = 'WAIT_FOR_TRANSFER',
  TRANSFERRED = 'TRANSFERRED',
}

export enum PaymentVoucherMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
}

export interface PaymentVoucher {
  code: string,
  amount: number,
  receiverId: string, // Supplier ID
  receiverName: string // Supplier Name
  description: string,
  note?: string,
  tourId?: string,
  deadline?: string,
  method: PaymentVoucherMethod,
  signGroup: string,
  includeTax: boolean,
  quickApproval: boolean,
  attachment?: string,
  status: PaymentVoucherStatus,
  readonly creatorId: string,
  readonly creatorName: string,
  readonly createdAt: number,
  readonly updatedAt: number
}

export type CreatePaymentVoucherForm = Pick<PaymentVoucher,
'amount' |
'receiverId' |
'description' |
'note' |
'tourId' |
'deadline' |
'method' |
'signGroup' |
'includeTax' |
'quickApproval'
> & {
  attachment: FileList
};

export type PaymentVoucherMethodType = keyof typeof PaymentVoucherMethod;
export const paymentVoucherMethodTypes: PaymentVoucherMethodType[] = Object.keys(
  PaymentVoucherMethod,
) as Array<PaymentVoucherMethodType>;
