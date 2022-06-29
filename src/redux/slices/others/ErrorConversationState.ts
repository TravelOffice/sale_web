import ConversationState from '@redux/slices/others/ConversationState';

export default class ErrorConversationState extends ConversationState {
  constructor(error: string) {
    super();
    this.error = error;
    this.fetching = false;
    this.conversations = [];
  }
}
