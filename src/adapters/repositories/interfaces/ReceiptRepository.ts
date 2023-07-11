import { Receipt } from '@domain/entities/receipt/Receipt';

export interface ReceiptRepository {
  getAllReceipts(): Promise<Receipt[]>;
}
