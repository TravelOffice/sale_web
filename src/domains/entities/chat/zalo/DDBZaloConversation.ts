import { ZaloMessageData } from '@domain/entities/chat/Message';

export interface DDBZaloConversation {
  info: {
    name: string,
    id: string,
    avatar: string,
  },
  conversationId: string,
  lastMessage: ZaloMessageData,
  createdAt: number,
  updatedAt: number,
  assignee?: string,
}
