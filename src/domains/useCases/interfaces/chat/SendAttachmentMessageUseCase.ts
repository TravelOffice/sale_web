import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';

export interface SendAttachmentMessageUseCase {
  invoke: (
    sender: string, file: File, fileType: AttachmentMessageType, conversation: Conversation,
  ) => Promise<void>
}
