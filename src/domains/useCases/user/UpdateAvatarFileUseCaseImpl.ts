import { s3Repository } from '@adapter/repositories';
import { UploadAvatarFileUseCase } from '@domain/useCases/interfaces/user/UploadAvatarFileUseCase';

export default class UploadAvatarFileUseCaseImpl implements UploadAvatarFileUseCase {
  invoke = async (
    file: File,
  ) => s3Repository.uploadAvatarAttachmentViaPresignedURL(file);
}
