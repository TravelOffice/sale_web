import ConversationState from '@redux/slices/others/ConversationState';

export default class GetConversationState extends ConversationState {
  constructor() {
    super();
    this.fetching = true;
    this.conversations = [];
    this.error = undefined;
  }
}
