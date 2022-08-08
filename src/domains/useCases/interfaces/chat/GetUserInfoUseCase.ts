import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';
import { TelegramUserInfo } from '@domain/entities/chat/telegram';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

export interface GetUserInfoUseCase {
  invoke: (
    chatPlatform: ChatPlatform, pageId: string, userId: string, chatId?: string
  ) => Promise<FacebookUserInfo | TelegramUserInfo>
}
