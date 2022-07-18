// Telegram message stored at DynamoDB
import { TelegramMessage } from '@domain/entities/chat/telegram/TelegramChat';
import DDBMessageGroupType from '@domain/entities/chat/telegram/DDBTelegramMessageGroupType';

export interface DDBTelegramMessages {
  messages: DDBTelegramMessage[],
  nextToken?: string,
}

export interface DDBTelegramMessage {
  content: TelegramMessage,
  type: DDBMessageGroupType,
  createdAt: number,
  updatedAt: number,
}
