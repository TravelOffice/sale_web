import { apiProvider } from '@adapter/infrastructures';
import { ReceiptRepository } from '@adapter/repositories/interfaces/ReceiptRepository';
import { Receipt } from '@domain/entities/receipt/Receipt';

export default class ReceiptRepositoryImpl implements ReceiptRepository {
  getAllReceipts = async () => {
    const response = await apiProvider.authorizedRequest.get('/receipts');
    return response.data;
  }

  createReceipt = async (receipt :Receipt) => {
    const response = await apiProvider.authorizedRequest.post('/receipts', receipt);
    return response.data;
  }

  updateReceipt = async (id: string, receipt :Receipt) => {
    const response = await apiProvider.authorizedRequest.put(`receipts/${id}`, receipt);
    return response.data;
  }

  deleteReceipt = async (id :string) => {
    const response = await apiProvider.authorizedRequest.delete(`receipts/${id}`);
    return response.data;
  }
}
