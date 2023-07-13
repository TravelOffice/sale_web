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
  note: string,
  readonly creatorId: string,
  readonly creatorName: string,
  readonly createdAt: number,
  readonly updatedAt: number
}

export type ReceiptCreateFormData = Pick<Receipt,
'paymentMethod' |
'amount' |
'description' |
'note'
>;

export interface ReceiptUpdateFormData {
  code?: string,
  paymentMethod: string,
  amount: number,
  description: string,
  note: string,
  status?: ReceiptStatus
}

export type ReceiptFormData = ReceiptCreateFormData | ReceiptUpdateFormData;

export type ReceiptStatusType = keyof typeof ReceiptStatus;
export const receiptStatusTypes: ReceiptStatusType[] = Object.keys(
  ReceiptStatus,
) as Array<ReceiptStatusType>;
