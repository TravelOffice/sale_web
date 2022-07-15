import { Conversation } from '@domain/entities/chat/Conversation';
import ConversationState from '@redux/slices/others/ConversationState';

export default class SuccessConversationState extends ConversationState {
  constructor(conversations: Conversation[]) {
    super();
    this.conversations = conversations;
    this.fetching = false;
    this.error = undefined;
  }
}
