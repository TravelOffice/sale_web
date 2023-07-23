import { PaymentVoucherPresenter } from '@adapter/presenters/interfaces/PaymentVoucherPresenter';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import {
  createPaymentVoucherUseCase,
  deletePaymentVoucherUseCase,
  getAllPaymentVouchersUseCase,
  updatePaymentVoucherUseCase,
  uploadPaymentVoucherFileUseCase,
} from '@domain/useCases';

export default class PaymentVoucherPresenterImpl implements PaymentVoucherPresenter {
    getAllPaymentVouchers = async () => getAllPaymentVouchersUseCase.invoke();

    createPaymentVoucher = async (
      paymentVoucher: PaymentVoucher,
    ) => createPaymentVoucherUseCase.invoke(paymentVoucher);

    updatePaymentVoucher = async (
      paymentVoucher: PaymentVoucher,
    ) => updatePaymentVoucherUseCase.invoke(paymentVoucher);

    deletePaymentVoucher = async (
      id: string,
    ) => deletePaymentVoucherUseCase.invoke(id);

    uploadPaymentVoucherAttachment = async (
      file: File,
    ) => uploadPaymentVoucherFileUseCase.invoke(file)
}
