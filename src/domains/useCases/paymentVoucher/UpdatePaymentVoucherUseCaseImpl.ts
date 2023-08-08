import { paymentVoucherRepository } from '@adapter/repositories';
import { UpdatePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/UpdatePaymentVoucherUseCase';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export default class UpdatePaymentVoucherUseCaseImpl implements UpdatePaymentVoucherUseCase {
  invoke = async (
    paymentVoucher: PaymentVoucher,
  ): Promise<PaymentVoucher> => paymentVoucherRepository.updatePaymentVoucher(
    paymentVoucher,
  )
}
