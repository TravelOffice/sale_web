import { Receipt } from '@domain/entities/receipt/Receipt';
import { GetAllReceiptsUseCase } from '@domain/useCases/interfaces/receipt/GetAllReceiptsTemplateUseCase';
import { receiptRepository } from '@adapter/repositories';

export default class GetAllReceiptsUseCaseImpl implements GetAllReceiptsUseCase {
  invoke = async (): Promise<Receipt[]> => receiptRepository.getAllReceipts();
}
