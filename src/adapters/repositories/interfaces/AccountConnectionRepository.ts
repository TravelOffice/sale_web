import { FacebookPage } from '@domain/entities/FacebookPage';

export interface AccountConnectionRepository {
  connectFacebookPage: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
}
