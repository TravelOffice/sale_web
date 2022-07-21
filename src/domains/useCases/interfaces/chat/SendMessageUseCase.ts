import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { Conversation } from '@domain/entities/chat/Conversation';

export interface SendMessageUseCase {
  invoke: (message: ChatPlatformSendMessage, conversation: Conversation) => Promise<void>
}
