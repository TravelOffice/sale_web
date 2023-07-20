import { GetAllPaymentVouchersUseCase } from '@domain/useCases/interfaces/paymentVoucher/GetAllPaymentVouchersTemplateUseCase';
import { paymentVoucherRepository } from '@adapter/repositories';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export default class GetAllPaymentVouchersUseCaseImpl implements GetAllPaymentVouchersUseCase {
  invoke = async (): Promise<PaymentVoucher[]> => paymentVoucherRepository.getAllPaymentVouchers();
}
