import { paymentVoucherRepository } from '@adapter/repositories';
import { ApprovePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/ApprovePaymentVoucherUseCase';

export default class ApprovePaymentVoucherFileUseCaseImpl
implements ApprovePaymentVoucherUseCase {
  invoke = async (
    paymentVoucherCode: string,
  ) => paymentVoucherRepository.approvePaymentVoucher(paymentVoucherCode);
}
