import { Receipt } from '@domain/entities/receipt/Receipt';
import { receiptRepository } from '@adapter/repositories';
import { CreateReceiptUseCase } from '@domain/useCases/interfaces/receipt/CreateReceiptUseCase';

export default class CreateReceiptUseCaseImpl implements CreateReceiptUseCase {
  invoke = async (
    receipt: Receipt,
  ): Promise<Receipt> => receiptRepository.createReceipt(receipt);
}
