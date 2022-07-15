import { Conversation } from '@domain/entities/chat/Conversation';

export interface GetFacebookConversationsUseCase {
  invoke: (pageId: string) => Promise<Conversation[]>
}
