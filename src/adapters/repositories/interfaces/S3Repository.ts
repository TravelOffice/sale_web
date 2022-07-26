import { Conversation } from '@domain/entities/chat/Conversation';
import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';

export interface S3Repository {
  uploadChatAttachmentViaPresignedURL: (
    pageId: string, customerId: string, file: File,
  ) => Promise<PresignedUrl>

  uploadFileToChatPlatform: (
    sender: string, fileType: string, conversation: Conversation, fileKey: string, fileName: string
  ) => Promise<any>
}
