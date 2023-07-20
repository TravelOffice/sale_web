import { paymentVoucherRepository } from '@adapter/repositories';
import { DeletePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/DeletePaymentVoucherUseCase';

export default class DeletePaymentVoucherUseCaseImpl implements DeletePaymentVoucherUseCase {
  invoke = async (
    id: string,
  ): Promise<string> => paymentVoucherRepository.deletePaymentVoucher(id);
}
