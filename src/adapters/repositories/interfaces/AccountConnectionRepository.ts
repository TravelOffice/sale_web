import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { ZaloPageProfile } from '@domain/entities/chat/zalo/ZaloPageProfile';
import { TelegramPageProfile } from '@domain/entities/chat/telegram/TelegramPageProfile';

export interface AccountConnectionRepository {
  connectFacebookPage: (
    userAccessToken: string,
    page: FacebookPageProfile,
  ) => Promise<FacebookPageProfile>
  connectZaloPage: (
    pageId: string,
    state: string,
    authorizationCode: string,
  ) => Promise<ZaloPageProfile>
  connectTelegramPage: (botToken: string) => Promise<TelegramPageProfile>
  unlinkPage: (platform: ChatPlatform, pageId: string) => Promise<void>
}
