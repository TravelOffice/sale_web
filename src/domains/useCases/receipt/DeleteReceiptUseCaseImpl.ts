import { receiptRepository } from '@adapter/repositories';
import { DeleteReceiptUseCase } from '@domain/useCases/interfaces/receipt/DeleteReceiptUseCase';

export default class DeleteReceiptUseCaseImpl implements DeleteReceiptUseCase {
  invoke = async (
    id: string,
  ): Promise<string> => receiptRepository.deleteReceipt(id);
}
