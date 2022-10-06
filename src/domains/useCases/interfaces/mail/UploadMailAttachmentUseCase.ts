import { MailAttachment } from '@domain/entities/mail/MailAttachment';

export interface UploadMailAttachmentUseCase {
  invoke: (file: File) => Promise<MailAttachment>
}
