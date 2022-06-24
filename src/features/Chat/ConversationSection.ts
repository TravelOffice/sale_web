import { Conversation } from '@domain/entities/Conversation';

export interface ConversationSection {
  title: string,
  conversations: Conversation[],
  fetching: boolean,
  error?: string,
}
