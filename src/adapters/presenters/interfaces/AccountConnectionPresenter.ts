import { FacebookPage } from '@domain/entities/FacebookPage';
import { ZaloPage } from '@domain/entities/ZaloPage';
import { Page } from '@domain/entities/Page';

export interface AccountConnectionPresenter {
  getFacebookPages: (userAccessToken: string) => Promise<FacebookPage[]>
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
  getZaloOAuthLink: () => Promise<string>
  connectZaloPage: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
  getLinkedFacebookPage: () => Promise<Page>
}
