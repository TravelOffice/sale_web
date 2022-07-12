import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { Page } from '@domain/entities/chat/Page';
import { ZaloPageProfile } from '@domain/entities/chat/zalo/ZaloPageProfile';
import { TelegramPageProfile } from '@domain/entities/chat/telegram/TelegramPageProfile';

export interface AccountConnectionPresenter {
  getFacebookPages: (userAccessToken: string) => Promise<FacebookPageProfile[]>
  connectFacebookPage: (
    userAccessToken: string,
    page: FacebookPageProfile,
  ) => Promise<FacebookPageProfile>
  getZaloOAuthLink: () => Promise<string>
  connectZaloPage: (
    pageId: string,
    state: string,
    authorizationCode: string,
  ) => Promise<ZaloPageProfile>
  connectTelegramPage: (botToken: string) => Promise<TelegramPageProfile>
  getLinkedPages: (refresh: boolean) => Promise<Array<Page>>
  unlinkPage: (platform: ChatPlatform, pageId: string) => Promise<void>
}
