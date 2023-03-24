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
  metadata?: string,
  attachments?: MessageAttachment[],
  sticker?: {
    id: string,
    link: string,
  }
}

export type ZaloMessageDataAttachmentType = 'image' | 'gif' | 'link' | 'video' | 'audio' | 'sticker' | 'location' | 'file';

export interface ZaloReceivedImageMessage {
  payload: {
    thumbnail?: string, // Display image
    url: string // Url of image
  }
  type: 'image' | 'gif'
}

export interface ZaloReceivedMediaMessage {
  payload: {
    thumbnail?: string, // Display image
    url: string, // Url of link and video
    description: string // Detail of linke and video
  }
  type: 'link' | 'video'
}

export interface ZaloReceivedAudioMessage {
  payload: {
    url: string // Url of audio
  }
  type: 'audio'
}

export interface ZaloReceivedStikerMessage {
  payload: {
    id: string, // ID of sticker
    url: string // Url of sticker
  }
  type: 'sticker'
}

export interface ZaloReceivedLocationMessage {
  payload: {
    coordinates: {
      latitude: string,
      longitude: string
    }
  }
  type: 'location'
}

export interface ZaloReceivedFileMessage {
  payload: {
    size: string, // Size of file
    name: string, // Name of file
    checksum: string, // MD5 hash checksum
    type: string, // Type of file
    url: string // Download url
  }
  type: 'file'
}

export type ZaloReceivedAttachment =
  ZaloReceivedAudioMessage
  | ZaloReceivedFileMessage
  | ZaloReceivedImageMessage
  | ZaloReceivedLocationMessage
  | ZaloReceivedMediaMessage
  | ZaloReceivedStikerMessage;

export interface ZaloMessageData {
  msg_id: string,
  text?: string,
  attachments?: Array<ZaloReceivedAttachment>,
  time: number,
  from_id: string,
  to_id: string,
  metadata?: string,
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
  seen?: boolean,
}

export type FacebookChatMessage = BaseMessage<'facebook'>;
export type ZaloChatMessage = BaseMessage<'zalo', ZaloMessage>;
export type TelegramChatMessage = BaseMessage<'telegram', TelegramMessage>;

export type Message = FacebookChatMessage | ZaloChatMessage | TelegramChatMessage;
