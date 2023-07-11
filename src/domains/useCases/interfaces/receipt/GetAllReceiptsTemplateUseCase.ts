import { Receipt } from '@domain/entities/receipt/Receipt';

export interface GetAllReceiptsUseCase {
  invoke: () => Promise<Receipt[]>
}
