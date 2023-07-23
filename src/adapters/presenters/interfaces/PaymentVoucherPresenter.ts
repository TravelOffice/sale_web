import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';

export interface PaymentVoucherPresenter {
  getAllPaymentVouchers: () => Promise<PaymentVoucher[]>
  createPaymentVoucher: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
  updatePaymentVoucher: (paymentVoucher: PaymentVoucher) => Promise<PaymentVoucher>
  deletePaymentVoucher: (id: string) => Promise<string>
  uploadPaymentVoucherAttachment: (file: File) => Promise<PresignedUrl>
}
