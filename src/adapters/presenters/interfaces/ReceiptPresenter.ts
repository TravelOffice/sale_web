import { Receipt } from '@domain/entities/receipt/Receipt';

export interface ReceiptPresenter {
  getAllReceipts: () => Promise<Receipt[]>
  createReceipt: (receipt: Receipt) => Promise<Receipt>
  updateReceipt: (receipt: Receipt) => Promise<Receipt>
  deleteReceipt: (id: string) => Promise<string>
}
