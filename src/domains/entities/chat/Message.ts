import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { TelegramMessage as TelegramMessageData } from './telegram';

export interface MessageAttachment {
  mimeType: string,
  previewUrl?: string,
  url?: string,
  fileSize?: number,
  name: string,
  width?: number,
  height?: number,
}

export interface FacebookMessageData {
  // Text message
  text: string,
  // Attachment message
  // Can be the image, audio, video and file
  attachments?: MessageAttachment[],
  // Sticker message
  sticker?: {
    id: string,
    link: string,
  }
}

export interface ZaloMessageData {
  // Zalo message contains string only
  // Wep application will check file type based on text content
  // that can be url, file, image or audio
  // Then show the specific component according to file type
  text: string,
}

// export type MessageData = FacebookMessageData | ZaloMessageData | TelegramMessageData;

export interface MessageData {
  // Text message
  text: string,
  // Attachment message
  // Can be image, audio, video and file
  attachments?: MessageAttachment[],
  // Sticker message
  sticker?: {
    id: string,
    link: string,
  }
}

export interface Message {
  id: string,
  customerId: string,
  messageData: MessageData,
  recipient: string,
  sender: string,
  timestamp: Date,
  chatPlatform: ChatPlatform,
  isUnsupported?: boolean,
}
