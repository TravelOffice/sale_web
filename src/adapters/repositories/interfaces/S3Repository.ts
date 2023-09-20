import { Conversation } from '@domain/entities/chat/Conversation';
import { PresignedUrl, PresignedUrlTypes } from '@domain/entities/chat/PresignedUrl';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';

export interface S3Repository {
  getPresignedUrl: (file: File, presignedUrlType: PresignedUrlTypes) => Promise<PresignedUrl>
  uploadFileViaPresignedURL: (file: File, presignedUrl: string) => Promise<string>
  uploadChatAttachmentViaPresignedURL: (
    pageId: string, customerId: string, file: File,
  ) => Promise<PresignedUrl>
  uploadFileToChatPlatform: (
    sender: string, fileType: string, conversation: Conversation, fileKey: string, fileName: string
  ) => Promise<any>
  uploadHtmlContentViaPresignedURL: (htmlContent: string) => Promise<string>
  uploadMailAttachmentViaPresignedURL: (file: File) => Promise<MailAttachment>
  uploadPaymentVoucherAttachmentViaPresignedURL: (file: File) => Promise<PresignedUrl>
  uploadAvatarAttachmentViaPresignedURL: (file: File) => Promise<PresignedUrl>
  uploadPassengerAttachedDocViaPresignedURL: (file: File) => Promise<PresignedUrl>
}
