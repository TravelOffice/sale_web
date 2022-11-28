import {
  BaseMessage,
  ZaloMessageData,
} from '@domain/entities/chat/Message';
import { Contact } from '@domain/entities/Contact';
import { ChatPlatform } from './ChatPlatform';

export type FacebookConversationLastMessage = BaseMessage<'facebook'>;
export type ZaloConversationLastMessage = BaseMessage<'zalo', ZaloMessageData>;
export type TelegramConversationLastMessage = BaseMessage<'telegram', ZaloMessageData>;
export type ConversationLastMessage =
  FacebookConversationLastMessage | ZaloConversationLastMessage | TelegramConversationLastMessage;

export type ConversationMessage<P extends ChatPlatform> = P extends 'facebook' ? FacebookConversationLastMessage
  : P extends 'zalo' ? ZaloConversationLastMessage
    : P extends 'telegram' ? TelegramConversationLastMessage
      : any;

export interface BaseConversation<P extends ChatPlatform> {
  id: string,
  contact: Contact,
  unseenMessages: number,
  lastMessage: ConversationMessage<P>,
  chatPlatform: P,
  pageId: string,
  assignee?: string,
}

export type FacebookConversation = BaseConversation<'facebook'>;

export type ZaloConversation = BaseConversation<'zalo'>;

export type TelegramConversation = BaseConversation<'telegram'>;

export type Conversation = FacebookConversation | ZaloConversation | TelegramConversation | any;
