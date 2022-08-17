import { apiProvider } from '@adapter/infrastructures';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { ZaloPageProfile } from '@domain/entities/chat/zalo/ZaloPageProfile';
import { TelegramPageProfile } from '@domain/entities/chat/telegram/TelegramPageProfile';
import { AccountConnectionRepository } from './interfaces/AccountConnectionRepository';

export default class AccountConnectionRepositoryImpl implements AccountConnectionRepository {
  /**
   * Connect user's Facebook page to the app.
   * @param userAccessToken Facebook user's access token
   * @param page the Facebook page which the user has selected
   */
  connectFacebookPage = async (userAccessToken: string, page: FacebookPageProfile) => {
    const data = { userAccessToken, pageId: page.id };
    await apiProvider.authorizedRequest.post('/facebook/link', data);
    return page;
  };

  connectZaloPage = async (pageId: string, state: string, authorizationCode: string) => {
    const { data } = await apiProvider.authorizedRequest.post('/zalo/link', { pageId, state, authorizationCode });
    return data as ZaloPageProfile;
  };

  /**
   * Method to connect Telegram by bot token
   * @param botToken the Telegram bot token
   */
  connectTelegramPage = async (botToken: string) => {
    const { data } = await apiProvider.authorizedRequest.post('/telegram/link', { token: botToken });
    return data as TelegramPageProfile;
  }

  /**
   * Unlink page
   * @param platform The Chat platform
   * @param pageId The id of chat platform
   * @returns void
   */
  unlinkPage = async (platform: ChatPlatform, pageId: string) => apiProvider.authorizedRequest.delete('/admin/linked_pages', {
    queryParams: {
      platform, pageId,
    },
  });
}
