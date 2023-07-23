import { Conversation } from '@domain/entities/chat/Conversation';
import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';

export interface S3Repository {
  uploadChatAttachmentViaPresignedURL: (
    pageId: string, customerId: string, file: File,
  ) => Promise<PresignedUrl>

  uploadFileToChatPlatform: (
    sender: string, fileType: string, conversation: Conversation, fileKey: string, fileName: string
  ) => Promise<any>
  uploadHtmlContentViaPresignedURL: (htmlContent: string) => Promise<string>
  uploadMailAttachmentViaPresignedURL: (file: File) => Promise<MailAttachment>
  uploadPaymentVoucherAttachmentViaPresignedURL: (file: File) => Promise<PresignedUrl>
}
