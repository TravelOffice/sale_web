import { FetchResult } from '@apollo/client';
import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import { Observable } from 'subscriptions-transport-ws';
import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { TelegramUserInfo } from '@domain/entities/chat/telegram';

export interface ChatPresenter {
  getPlatformConversations: (
    platform: ChatPlatform,
    platformPageId: string,
  ) => Promise<Conversation[]>;

  getMessages: (conversation: Conversation) => Promise<Message[]>

  loadMoreMessage: (conversation: Conversation) => Promise<Message[]>

  sendMessage: (message: ChatPlatformSendMessage, conversation: Conversation) => Promise<void>

  sendAttachmentMessage: (
    sender: string, attachment: File, fileType: SendMessageType, conversation: Conversation,
  ) => Promise<void>

  subscribeNewMessage: () => Observable<FetchResult>

  adminGetPlatformConversations: (
    platform: ChatPlatform,
    platformPageId: string,
  ) => Promise<Conversation[]>;

  getUserProfile: (
    chatPlatform: ChatPlatform, pageId: string, userId: string, chatId?: string
  ) => Promise<FacebookUserInfo | TelegramUserInfo>

  assignChat: (
    conversation: Conversation,
    newAssignee:string,
  ) => Promise<void>
}
