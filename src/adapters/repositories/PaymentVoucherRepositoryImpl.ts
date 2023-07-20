import { apiProvider } from '@adapter/infrastructures';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { PaymentVoucherRepository } from '@adapter/repositories/interfaces/PaymentVoucherRepository';

export default class PaymentVoucherRepositoryImpl implements PaymentVoucherRepository {
  getAllPaymentVouchers = async () => {
    const response = await apiProvider.authorizedRequest.get('/payment-vouchers');
    return response.data;
  }

  createPaymentVoucher = async (paymentVoucher :PaymentVoucher) => {
    const response = await apiProvider.authorizedRequest.post('/payment-vouchers', paymentVoucher);
    return response.data;
  }

  updatePaymentVoucher = async (id: string, paymentVoucher :PaymentVoucher) => {
    const response = await apiProvider.authorizedRequest.put(`payment-vouchers/${id}`, paymentVoucher);
    return response.data;
  }

  deletePaymentVoucher = async (id :string) => {
    const response = await apiProvider.authorizedRequest.delete(`payment-vouchers/${id}`);
    return response.data;
  }
}
