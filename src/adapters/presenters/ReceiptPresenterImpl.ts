import { ReceiptPresenter } from '@adapter/presenters/interfaces/ReceiptPresenter';
import { getAllReceiptsUseCase } from '@domain/useCases';

export default class ReceiptPresenterImpl implements ReceiptPresenter {
    getAllReceipts = async () => getAllReceiptsUseCase.invoke();
}
