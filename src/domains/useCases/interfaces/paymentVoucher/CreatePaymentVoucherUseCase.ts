import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface CreatePaymentVoucherUseCase {
  invoke: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
}
