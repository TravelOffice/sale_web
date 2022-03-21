import { FetchResult, Observable } from '@apollo/client';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { Conversation } from '@domain/entities/Conversation';
import { FacebookMessage } from '@domain/entities/FacebookMessage';
import { Message } from '@domain/entities/Message';
import { ZaloMessage } from '@domain/entities/ZaloMessage';

export interface ChatRepository {
  getConversations: (fbPageid: string, zaloPageId: string) => Promise<Conversation[]>
  getFbMessages: (
    conversationId: string, fbPageId: string, before?: string
  ) => Promise<[FacebookMessage[], string]>
  getZaloMessages: (conversationId: string, zaloPageId: string) => Promise<ZaloMessage[]>
  sendMessage: (platform: ChatPlatform, message: Message) => Promise<void>
  subscribeToNewMessage: () => Observable<FetchResult>
}
