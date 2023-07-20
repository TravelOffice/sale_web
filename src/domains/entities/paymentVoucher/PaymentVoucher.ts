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
  receiver: string,
  description: string,
  note?: string,
  bookingId?: string,
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
