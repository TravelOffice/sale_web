import { Optional, Omit } from 'utility-types';
import { Message } from '../Message';
import { FacebookSendMessageContent } from './FbSendMessageContent';
import { ZaloSendMessageContent } from './ZaloSendMessageContent';

export type ChatPlatformSendMessage = Omit<Optional<Message, 'id' | 'timestamp'>, 'messageData'> & {
  // Redefine the message data for sending to AppSync
  messageData: FacebookSendMessageContent | ZaloSendMessageContent
};
