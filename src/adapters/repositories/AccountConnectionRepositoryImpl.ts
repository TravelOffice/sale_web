import { apiProvider } from '@adapter/infrastructures';
import { FacebookPage } from '@domain/entities/FacebookPage';
import { ZaloPage } from '@domain/entities/ZaloPage';
import { AccountConnectionRepository } from './interfaces/AccountConnectionRepository';

export default class AccountConnectionRepositoryImpl implements AccountConnectionRepository {
  /**
   * Connect user's Facebook page to the app.
   * @param userAccessToken Facebook user's access token
   * @param page the Facebook page which the user has selected
   */
  connectFacebookPage = async (userAccessToken: string, page: FacebookPage) => {
    const data = { userAccessToken, pageId: page.id };
    await apiProvider.authorizedRequest.post('/facebook/link', data);
    return page;
  };

  connectZaloPage = async (pageId: string, state: string, authorizationCode: string) => {
    const result = await apiProvider.authorizedRequest.post('/zalo/link', { pageId, state, authorizationCode });
    return result.data as ZaloPage;
  };
}
