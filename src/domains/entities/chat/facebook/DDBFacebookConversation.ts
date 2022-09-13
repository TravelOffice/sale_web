import { FacebookConversation } from '@domain/entities/chat/facebook/FacebookConversation';

export interface DDBFacebookConversation {
  conversationId: string,
  info: FacebookConversation,
  // lastMessage is not used yet
  lastMessage: any,
  createdAt: number,
  updatedAt: number,
  assignee?: string,
}
