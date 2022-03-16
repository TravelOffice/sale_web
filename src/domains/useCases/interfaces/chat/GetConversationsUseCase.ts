import { Conversation } from '@domain/entities/Conversation';

export interface GetConversationsUseCase {
  invoke: () => Promise<Conversation[]>
}
