import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface GetPaymentVouchersOfTourUseCase {
  invoke: (departureTourId: string) => Promise<PaymentVoucher[]>
}
