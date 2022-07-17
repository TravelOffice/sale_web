import { TelegramChat, TelegramMessage } from '@domain/entities/chat/telegram/TelegramChat';

export interface TelegramConversation {
  info: TelegramChat,
  lastMessage: TelegramMessage,
  conversationId: string,
  createdAt: string,
  updatedAt: string,
}
