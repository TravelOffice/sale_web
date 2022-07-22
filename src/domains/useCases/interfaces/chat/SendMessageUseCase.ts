import { Conversation } from '@domain/entities/chat/Conversation';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';

export interface SendMessageUseCase {
  invoke: (message: ChatPlatformSendMessage, conversation: Conversation) => Promise<void>
}
