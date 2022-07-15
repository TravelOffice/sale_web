import { Conversation } from '@domain/entities/chat/Conversation';

export interface S3Repository {
  uploadChatAttachmentViaPresignedURL: (
    pageId: string, customerId: string, file: File,
  ) => Promise<{ url: string, key: string }>

  uploadFileToChatPlatform: (
    sender: string, fileType: string, conversation: Conversation, fileKey: string, fileName: string
  ) => Promise<any>
}
