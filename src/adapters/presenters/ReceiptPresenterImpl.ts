import { ReceiptPresenter } from '@adapter/presenters/interfaces/ReceiptPresenter';
import { Receipt } from '@domain/entities/receipt/Receipt';
import {
  createReceiptUseCase,
  deleteReceiptUseCase,
  getAllReceiptsUseCase,
  updateReceiptUseCase,
} from '@domain/useCases';

export default class ReceiptPresenterImpl implements ReceiptPresenter {
    getAllReceipts = async () => getAllReceiptsUseCase.invoke();

    createReceipt = async (
      receipt: Receipt,
    ) => createReceiptUseCase.invoke(receipt);

    updateReceipt = async (
      receipt: Receipt,
    ) => updateReceiptUseCase.invoke(receipt);

    deleteReceipt = async (
      id: string,
    ) => deleteReceiptUseCase.invoke(id);
}
