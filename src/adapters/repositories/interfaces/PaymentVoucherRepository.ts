import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface PaymentVoucherRepository {
  getAllPaymentVouchers(): Promise<PaymentVoucher[]>;
  createPaymentVoucher(paymentVoucher: PaymentVoucher): Promise<PaymentVoucher>
  updatePaymentVoucher(id: string, paymentVoucher: PaymentVoucher): Promise<PaymentVoucher>
  deletePaymentVoucher(id: string): Promise<string>
}
