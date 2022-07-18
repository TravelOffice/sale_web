import { TelegramChat, TelegramMessage } from '@domain/entities/chat/telegram/TelegramChat';

// Telegram conversation stored at DynamoDB
export interface DDBTelegramConversation {
  info: TelegramChat,
  lastMessage: TelegramMessage,
  conversationId: string,
  createdAt: number,
  updatedAt: number,
}
