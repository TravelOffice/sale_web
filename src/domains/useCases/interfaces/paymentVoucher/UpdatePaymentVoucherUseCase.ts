import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface UpdatePaymentVoucherUseCase {
  invoke: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
}
