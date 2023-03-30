import { FetchResult, Observable } from '@apollo/client';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';
import { DDBFacebookMessage } from '@domain/entities/chat/facebook/FacebookMessage';
import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { DDBTelegramMessages } from '@domain/entities/chat/telegram/DDBTelegramMessage';
import { TelegramUserInfo } from '@domain/entities/chat/telegram';
import { DDBZaloMessage } from '@domain/entities/chat/zalo/DDBZaloMessage';

export interface ChatRepository {
  getFacebookConversations: (pageId: string) => Promise<Conversation[]>
  getZaloConversations: (pageId: string) => Promise<Conversation[]>
  getTelegramConversations: (botId: string) => Promise<Conversation[]>
  getFbMessages: (
    conversationId: string, fbPageId: string, before?: string
  ) => Promise<[DDBFacebookMessage[], string]>
  getZaloMessages: (
    conversationId: string, zaloPageId: string, before?: string
  ) => Promise<[DDBZaloMessage[], string]>
  getTelegramMessages: (
    conversationId: string,
    botId: string,
    nextToken?: string,
  ) => Promise<DDBTelegramMessages>
  sendMessage: (
    platform: ChatPlatform,
    conversationId: string,
    message: ChatPlatformSendMessage,
  ) => Promise<void>
  subscribeToNewMessage: () => Observable<FetchResult>
  adminGetFacebookConversations: (pageId: string) => Promise<Conversation[]>
  adminGetZaloConversations: (pageId: string) => Promise<Conversation[]>
  adminGetTelegramConversations: (botId: string) => Promise<Conversation[]>
  getUserInfo: (
    chatPlatform: ChatPlatform, pageId: string, userId: string, chatId?: string
  ) => Promise<FacebookUserInfo | TelegramUserInfo>
  manualAssignChat: (data: {
    chatPlatform: ChatPlatform,
    pageId: string,
    conversationId: string,
    assignee: string,
  }) => Promise<void>
}
