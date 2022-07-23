import { Optional, Omit } from 'utility-types';
import { Message } from './Message';
import { FacebookSendMessageContent } from './facebook/FbSendMessageContent';
import { ZaloSendMessageContent } from './zalo/ZaloSendMessageContent';
import { TelegramSendMessageOptions } from './telegram/sendMessage/TelegramSendMessageOption';
import { TelegramSendMessageContent } from './telegram/sendMessage/TelegramSendMessageContent';
import SendMessageType from './AttachmentMessageType';

export type ChatPlatformSendMessage = Omit<Optional<Message, 'id' | 'timestamp'>, 'messageData'> & {
  // Redefine the message data for sending to AppSync
  messageData: FacebookSendMessageContent
  | ZaloSendMessageContent
  | TelegramSendMessageContent<SendMessageType, TelegramSendMessageOptions>;
};
