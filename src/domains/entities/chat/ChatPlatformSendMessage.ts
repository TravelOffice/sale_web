import { Optional, Omit } from 'utility-types';
import { Message } from './Message';
import { FacebookSendMessageContent } from './facebook/FbSendMessageContent';
import { ZaloSendMessageContent } from './zalo/ZaloSendMessageContent';

export type ChatPlatformSendMessage = Omit<Optional<Message, 'id' | 'timestamp'>, 'messageData'> & {
  // Redefine the message data for sending to AppSync
  messageData: FacebookSendMessageContent | ZaloSendMessageContent
};
