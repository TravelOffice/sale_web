import { Receipt } from '@domain/entities/receipt/Receipt';

export interface ReceiptRepository {
  getAllReceipts(): Promise<Receipt[]>;
  createReceipt(receipt: Receipt): Promise<Receipt>
  updateReceipt(id: string, receipt: Receipt): Promise<Receipt>
  deleteReceipt(id: string): Promise<string>
}
