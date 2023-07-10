import { Receipt } from '@domain/entities/receipt/Receipt';

export interface ReceiptPresenter {
  getAllReceipts: () => Promise<Receipt[]>
}
