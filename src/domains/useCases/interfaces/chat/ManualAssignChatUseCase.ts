import { Conversation } from '@domain/entities/chat/Conversation';

export interface ManualAssignChatUseCase {
  invoke: (
    conversation: Conversation,
    assignee: string,
  ) => Promise<void>
}
