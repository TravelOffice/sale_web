import { s3Repository } from '@adapter/repositories';
import { UploadPaymentVoucherFileUseCase } from '@domain/useCases/interfaces/paymentVoucher/SendAttachmentMessageUseCase';

export default class UploadPaymentVoucherFileUseCaseImpl
implements UploadPaymentVoucherFileUseCase {
  invoke = async (
    file: File,
  ) => s3Repository.uploadPaymentVoucherAttachmentViaPresignedURL(file);
}
