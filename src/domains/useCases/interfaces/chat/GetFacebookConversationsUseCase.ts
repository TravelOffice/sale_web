import { Conversation } from '@domain/entities/Conversation';

export interface GetFacebookConversationsUseCase {
  invoke: (pageId: string) => Promise<Conversation[]>
}
