import { Conversation } from '@domain/entities/chat/Conversation';

export interface GetZaloConversationsUseCase {
  invoke: (pageId: string) => Promise<Conversation[]>
}
