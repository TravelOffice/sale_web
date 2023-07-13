import { Receipt } from '@domain/entities/receipt/Receipt';

export interface CreateReceiptUseCase {
  invoke: (receipt: Receipt) => Promise<Receipt>
}
