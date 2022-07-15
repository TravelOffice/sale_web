import { Conversation } from '@domain/entities/chat/Conversation';

export interface ConversationSection {
  title: string,
  conversations: Conversation[],
  fetching: boolean,
  error?: string,
}
