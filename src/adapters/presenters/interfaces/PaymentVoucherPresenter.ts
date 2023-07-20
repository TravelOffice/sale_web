import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface PaymentVoucherPresenter {
  getAllPaymentVouchers: () => Promise<PaymentVoucher[]>
  createPaymentVoucher: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
  updatePaymentVoucher: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
  deletePaymentVoucher: (id: string) => Promise<string>
}
