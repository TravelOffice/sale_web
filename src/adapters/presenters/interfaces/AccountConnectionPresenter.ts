import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookPage } from '@domain/entities/chat/facebook/FacebookPage';
import { Page } from '@domain/entities/chat/Page';
import { ZaloPage } from '@domain/entities/chat/zalo/ZaloPage';

export interface AccountConnectionPresenter {
  getFacebookPages: (userAccessToken: string) => Promise<FacebookPage[]>
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
  getZaloOAuthLink: () => Promise<string>
  connectZaloPage: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
  getLinkedPages: (refresh: boolean) => Promise<Array<Page>>
  unlinkPage: (platform: ChatPlatform, pageId: string) => Promise<void>
}
