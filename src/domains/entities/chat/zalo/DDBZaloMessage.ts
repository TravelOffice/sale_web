// Telegram message stored at DynamoDB

import { ZaloMessageData } from '../Message';

export interface DDBTelegramMessages {
  data: DDBZaloMessage[],
  nextToken?: string,
}

export interface DDBZaloMessage {
  content: ZaloMessageData,
}
