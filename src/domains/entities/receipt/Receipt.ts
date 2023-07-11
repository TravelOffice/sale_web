export enum ReceiptStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface Receipt {
  code: string,
  paymentMethod: string,
  status: ReceiptStatus,
  bookingId?: string,
  customerId?: string,
  customerName?: string,
  amount: number,
  description: string,
  note?: string,
  creatorId: string,
  creatorName: string,
  createdAt: number,
  updatedAt: number
}

export type CreateReceiptFormData = Pick<Receipt,
'code' |
'paymentMethod' |
'amount' |
'description' |
'note'
>;
