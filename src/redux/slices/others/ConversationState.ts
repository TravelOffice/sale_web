import { Conversation } from '@domain/entities/chat/Conversation';

export default class ConversationState {
  // Are conversations fetching
  fetching: boolean;

  // Conversation items
  conversations: Conversation[];

  // Fetching error message
  error?: string;

  /**
   * Constructor to init ConversationState object
   * @param fetching Are conversations fetching
   * @param error Fetching error message
   * @param conversations Conversation items
   */
  constructor(
    fetching?: boolean,
    conversations?: Conversation[],
    error?: string,
  ) {
    this.fetching = fetching || false;
    this.error = error;
    this.conversations = conversations || [];
  }

  /**
   * On new conversation arrived
   * New conversation state object will be returned
   * @param newConversation New conversation arrived
   * @param selectedConversation Selected conversation
   * @returns New ConversationState object
   */
  onNewConversation(
    newConversation: Conversation,
    selectedConversation?: Conversation,
  ) {
    const index = this.conversations.findIndex((item) => item.id === newConversation.id);
    let newConversations = this.conversations;
    if (index < 0) {
      // New customer chat with organization
      newConversations = newConversations.concat(newConversation);
    } else {
      newConversations[index] = newConversation;
      // Increase unseen message if conversation is not currently selected
      if (!selectedConversation || newConversation.id !== selectedConversation.id) {
        newConversations[index].unseenMessages += 1;
      }
    }
    return new ConversationState(this.fetching, newConversations, this.error);
  }

  /**
   * Assignee of conversation has been updated
   * This value should be updated
   * @param conversation Conversation to be updated
   * @param assignee New assignee
   */
  onConversationAssigned(conversation: Conversation, assignee: string) {
    const index = this.conversations.findIndex((item) => item.id === conversation.id);
    const newConversations = this.conversations;
    if (index >= 0) {
      newConversations[index].assignee = assignee;
    }
    return new ConversationState(this.fetching, newConversations, this.error);
  }
}
