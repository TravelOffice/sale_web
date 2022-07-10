import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { FacebookPage } from '@domain/entities/FacebookPage';
import { ZaloPage } from '@domain/entities/ZaloPage';

export interface AccountConnectionRepository {
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
  connectZaloPage: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
  unlinkPage: (platform: ChatPlatform, pageId: string) => Promise<void>
}
