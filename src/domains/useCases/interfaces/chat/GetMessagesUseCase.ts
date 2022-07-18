import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';

export interface GetMessagesUseCase {
  invoke: (conversation: Conversation, nextToken?: string) => Promise<[Message[], string?]>
}
