import {
  FileOptions,
  TelegramAttachmentContent,
  TelegramSendMessageOptions,
} from '@domain/entities/chat/telegram/send-message/TelegramSendMessageOptions';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';

export interface TelegramSendMessageContent {
  // Message type
  messageType: AttachmentMessageType,
  // Text message content
  text?: string,
  /**
   * Content to send
   * - string (url) | Buffer | Stream for file message
   * Note: File message can be the photo, audio, video, document
   */
  attachment?: TelegramAttachmentContent,
  // Send message options according to type of message
  options?: TelegramSendMessageOptions,
  // File options object includes file name and content type
  fileOptions?: FileOptions,
}
