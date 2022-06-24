import { Conversation } from '@domain/entities/Conversation';

export interface GetZaloConversationsUseCase {
  invoke: (pageId: string) => Promise<Conversation[]>
}
