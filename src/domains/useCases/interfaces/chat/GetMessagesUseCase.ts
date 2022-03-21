import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';

export interface GetMessagesUseCase {
  invoke: (conversation: Conversation) => Promise<Message[]>
}
