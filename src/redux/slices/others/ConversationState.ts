import { Conversation } from '@domain/entities/chat/Conversation';

export default class ConversationState {
  fetching: boolean = false;

  conversations: Conversation[] = [];

  error?: string = undefined;

  onNewConversation(newConversation: Conversation) {
    const index = this.conversations.findIndex((item) => item.id === newConversation.id);
    const newState = new ConversationState();
    newState.fetching = this.fetching;
    newState.error = this.error;
    if (index < 0) {
      newState.conversations = this.conversations.concat(newConversation);
    } else {
      newState.conversations = this.conversations;
      newState.conversations[index] = newConversation;
      newState.conversations[index].unseenMessages += 1;
    }
    return newState;
  }
}
