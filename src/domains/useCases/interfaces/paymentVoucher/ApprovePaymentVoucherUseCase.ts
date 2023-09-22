import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface ApprovePaymentVoucherUseCase {
  invoke: (paymentVoucherCode: string) => Promise<PaymentVoucher>
}
