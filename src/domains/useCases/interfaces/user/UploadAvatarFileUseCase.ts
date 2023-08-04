import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';

export interface UploadAvatarFileUseCase {
  invoke: (file: File) => Promise<PresignedUrl>
}
