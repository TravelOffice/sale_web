import { Conversation } from '@domain/entities/Conversation';

export default class ConversationState {
  fetching: boolean = false;

  conversations: Conversation[] = [];

  error?: string = undefined;
}
