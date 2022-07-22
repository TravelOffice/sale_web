import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/chat/Conversation';

export interface SendAttachmentMessageUseCase {
  invoke: (
    sender: string, file: File, fileType: SendMessageType, conversation: Conversation,
  ) => Promise<void>
}
