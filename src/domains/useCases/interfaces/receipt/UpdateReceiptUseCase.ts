import { Receipt } from '@domain/entities/receipt/Receipt';

export interface UpdateReceiptUseCase {
  invoke: (receipt: Receipt) => Promise<Receipt>
}
