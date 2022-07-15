import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';

export interface SendMessageUseCase {
  invoke: (message: Message, conversation: Conversation) => Promise<void>
}
