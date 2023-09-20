import {
  UploadSupplierQuoteAttachmentUseCase,
} from '@domain/useCases/interfaces/supplier/UploadSupplierQuoteAttachmentUseCase';
import { PresignedUrlTypes } from '@domain/entities/chat/PresignedUrl';
import { s3Repository } from '@adapter/repositories';

export default class UploadSupplierQuoteAttachmentUseCaseImpl
implements UploadSupplierQuoteAttachmentUseCase {
  invoke = async (
    file: File,
    presignedUrl?: string,
  ) : Promise<string> => {
    if (presignedUrl) {
      return s3Repository.uploadFileViaPresignedURL(file, presignedUrl);
    }
    const newPresignedUrl = await s3Repository.getPresignedUrl(
      file,
      PresignedUrlTypes.SUPPLIER_QUOTE_ATTACHMENT,
    );
    return s3Repository.uploadFileViaPresignedURL(file, newPresignedUrl.cdn);
  }
}
