import { Receipt } from '@domain/entities/receipt/Receipt';
import { receiptRepository } from '@adapter/repositories';
import { UpdateReceiptUseCase } from '@domain/useCases/interfaces/receipt/UpdateReceiptUseCase';

export default class UpdateReceiptUseCaseImpl implements UpdateReceiptUseCase {
  invoke = async (
    receipt: Receipt,
  ): Promise<Receipt> => {
    const { code, ...receiptToUpdate } = receipt;
    return receiptRepository.updateReceipt(code, receiptToUpdate as Receipt);
  }
}
