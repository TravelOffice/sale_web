import { CreatePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/CreatePaymentVoucherUseCase';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { paymentVoucherRepository } from '@adapter/repositories';

export default class CreatePaymentVoucherUseCaseImpl implements CreatePaymentVoucherUseCase {
  invoke = async (
    paymentVoucher: PaymentVoucher,
  ): Promise<PaymentVoucher> => paymentVoucherRepository.createPaymentVoucher(paymentVoucher);
}
