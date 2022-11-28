import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';

export interface MessageAttachment {
  mimeType: string,
  previewUrl?: string,
  url?: string,
  fileSize?: number,
  name: string,
  width?: number,
  height?: number,
}

export interface MessageData {
  text: string,
  attachments?: MessageAttachment[],
  sticker?: {
    id: string,
    link: string,
  }
}

export type ZaloMessageDataAttachmentType = 'image' | 'gif' | 'link' | 'video';

export interface ZaloMessageData {
  msg_id: string,
  text?: string,
  attachments?: Array<{ type: ZaloMessageDataAttachmentType }>,
  time: number,
  from_id: string,
  to_id: string,
}

export interface BaseMessage<P extends ChatPlatform, D extends any = MessageData> {
  id: string,
  customerId: string,
  messageData: D,
  recipient: string,
  sender: string,
  timestamp: Date,
  chatPlatform: P,
  isUnsupported?: boolean,
}

export type FacebookChatMessage = BaseMessage<'facebook'>;
export type ZaloChatMessage = BaseMessage<'zalo', ZaloMessage>;
export type TelegramChatMessage = BaseMessage<'telegram', TelegramMessage>;

export type Message = FacebookChatMessage | ZaloChatMessage | TelegramChatMessage;
