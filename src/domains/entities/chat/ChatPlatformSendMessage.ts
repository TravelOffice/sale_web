import { Optional, Omit } from 'utility-types';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Message } from './Message';
import { FacebookSendMessageContent } from './facebook/FbSendMessageContent';
import { ZaloSendMessageContent } from './zalo/ZaloSendMessageContent';
import { TelegramSendMessageContent } from './telegram/sendMessage/TelegramSendMessageContent';

export type SendMessageWithoutData = Omit<Optional<Message, 'id' | 'timestamp'>, 'messageData'>;

export type SendMessageContent<P extends ChatPlatform> = {
  messageData: P extends 'facebook' ? FacebookSendMessageContent
    : P extends 'zalo' ? ZaloSendMessageContent
      : TelegramSendMessageContent
};

export type FacebookSendMessage = SendMessageWithoutData & SendMessageContent<'facebook'>;

export type ZaloSendMessage = SendMessageWithoutData & SendMessageContent<'zalo'>;

export type TelegramSendMessage = SendMessageWithoutData & SendMessageContent<'telegram'>;

export type ChatPlatformSendMessage = FacebookSendMessage | ZaloSendMessage | TelegramSendMessage;
