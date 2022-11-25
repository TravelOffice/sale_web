import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';

export interface ZaloConversation {
  info: {
    name: string,
    id: string,
    avatar: string,
  },
  conversationId: string,
  lastMessage: ZaloMessage,
  createdAt: number,
  updatedAt: number,
  assignee?: string,
}
