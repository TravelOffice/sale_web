import { FetchResult } from '@apollo/client';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import { Observable } from 'subscriptions-transport-ws';

export interface ChatPresenter {
  getConversations: () => Promise<Conversation[]>
  getMessages: (conversation: Conversation) => Promise<Message[]>
  loadMoreMessage: (conversation: Conversation) => Promise<Message[]>
  sendMessage: (message: Message, conversation: Conversation) => Promise<void>
  sendAttachmentMessage: (
    sender: string, attachment: File, conversation: Conversation
  ) => Promise<void>
  subscribeNewMessage: () => Observable<FetchResult>
}
