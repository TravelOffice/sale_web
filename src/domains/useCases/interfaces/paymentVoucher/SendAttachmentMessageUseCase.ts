import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';

export interface UploadPaymentVoucherFileUseCase {
  invoke: (file: File) => Promise<PresignedUrl>
}
