import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface GetAllPaymentVouchersUseCase {
  invoke: () => Promise<PaymentVoucher[]>
}
