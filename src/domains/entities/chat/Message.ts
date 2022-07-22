import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { TelegramMessage } from '@domain/entities/chat/telegram';

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
export type ZaloChatMessage = BaseMessage<'zalo'>;
export type TelegramChatMessage = BaseMessage<'telegram', TelegramMessage>;

export type Message = FacebookChatMessage | ZaloChatMessage | TelegramChatMessage;
