import SendMessageType from '../../AttachmentMessageType';
import {
  FileOptions,
  SendAudioOptions,
  SendMessageOptions,
  SendPhotoOptions,
  SendVideoOptions,
  TelegramAttachmentContent,
  TelegramSendMessageOptions,
} from './TelegramSendMessageOption';

export interface TelegramSendMessageContent
  <T extends SendMessageType = SendMessageType,
  OPTIONS extends TelegramSendMessageOptions = TelegramSendMessageOptions,
  > {
  // Message type
  messageType: T,
  // Text message content
  text: T extends 'text' ? string : never,
  /**
   * Content to send0
   * - string (url) | Buffer | Stream for file message
   * Note: File message can be photo, audio, video, document
   */
  attachment: T extends 'text' ? never : TelegramAttachmentContent,
  // Send message options according to type of message
  options: T extends 'text' ? never : OPTIONS | undefined,
  // File options object includes file name and content type
  fileOptions: T extends 'text' ? never : FileOptions | undefined,
}

export type TelegramSendTextContent =
TelegramSendMessageContent<SendMessageType.TEXT, SendMessageOptions>;

export type TelegramSendPhotoContent =
TelegramSendMessageContent<SendMessageType.IMAGE, SendPhotoOptions>;

export type TelegramSendVideoContent =
TelegramSendMessageContent<SendMessageType.VIDEO, SendVideoOptions>;

export type TelegramSendAudioContent =
TelegramSendMessageContent<SendMessageType.AUDIO, SendAudioOptions>;

export type TelegramSendFileContent =
TelegramSendMessageContent<SendMessageType.FILE, SendVideoOptions>;
