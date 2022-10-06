import { s3Repository } from '@adapter/repositories';
import { UploadMailAttachmentUseCase } from '@domain/useCases/interfaces/mail/UploadMailAttachmentUseCase';

export default class UploadMailAttachmentUseCaseImpl implements UploadMailAttachmentUseCase {
    invoke = async (file: File) => s3Repository.uploadMailAttachmentViaPresignedURL(file)
}
