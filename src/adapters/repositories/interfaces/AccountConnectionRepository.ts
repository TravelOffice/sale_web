import { FacebookPage } from '@domain/entities/FacebookPage';
import { ZaloPage } from '@domain/entities/ZaloPage';
import { Page } from '@domain/entities/Page';

export interface AccountConnectionRepository {
  getLinkedFacebookPage: () => Promise<Page>
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
  connectZaloPage: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
}
