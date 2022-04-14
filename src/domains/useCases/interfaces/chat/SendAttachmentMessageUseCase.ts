import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';

export interface SendAttachmentMessageUseCase {
  invoke: (sender: string, file: File, conversation: Conversation) => Promise<void>
}
