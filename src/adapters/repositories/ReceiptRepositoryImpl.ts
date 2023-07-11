import { apiProvider } from '@adapter/infrastructures';
import { ReceiptRepository } from '@adapter/repositories/interfaces/ReceiptRepository';

export default class ReceiptRepositoryImpl implements ReceiptRepository {
  getAllReceipts = async () => {
    const response = await apiProvider.authorizedRequest.get('/receipts');
    return response.data;
  }
}
