import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';

export interface SendMessageUseCase {
  invoke: (message: Message, conversation: Conversation) => Promise<void>
}
