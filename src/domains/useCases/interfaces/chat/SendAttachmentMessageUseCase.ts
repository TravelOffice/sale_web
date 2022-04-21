import { Conversation } from '@domain/entities/Conversation';

export interface SendAttachmentMessageUseCase {
  invoke: (sender: string, file: File, conversation: Conversation) => Promise<void>
}
