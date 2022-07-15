import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

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
