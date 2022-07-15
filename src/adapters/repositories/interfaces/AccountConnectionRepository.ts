import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookPage } from '@domain/entities/chat/facebook/FacebookPage';
import { ZaloPage } from '@domain/entities/chat/zalo/ZaloPage';

export interface AccountConnectionRepository {
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
  connectZaloPage: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
  unlinkPage: (platform: ChatPlatform, pageId: string) => Promise<void>
}
