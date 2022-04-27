import { FacebookPage } from '@domain/entities/FacebookPage';

export interface AccountConnectionPresenter {
  getFacebookPages: (userAccessToken: string) => Promise<FacebookPage[]>
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
}
