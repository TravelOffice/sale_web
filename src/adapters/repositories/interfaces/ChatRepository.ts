import { FetchResult, Observable } from '@apollo/client';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';
import { FacebookMessage } from '@domain/entities/chat/facebook/FacebookMessage';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';
import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';

export interface ChatRepository {
  getFacebookConversations: (pageId: string) => Promise<Conversation[]>
  getZaloConversations: (pageId: string) => Promise<Conversation[]>
  getFbMessages: (
    conversationId: string, fbPageId: string, before?: string
  ) => Promise<[FacebookMessage[], string]>
  getZaloMessages: (conversationId: string, zaloPageId: string) => Promise<ZaloMessage[]>
  sendMessage: (platform: ChatPlatform, message: ChatPlatformSendMessage) => Promise<void>
  subscribeToNewMessage: () => Observable<FetchResult>
  getFbUserInfo: (pageId: string, userId: string) => Promise<FacebookUserInfo>
}
