import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import axios from 'axios';

export default class FacebookPageRepositoryImpl implements FacebookRepository {
  /**
   * Get all Facebook pages which the user manages using user access token,
   * then convert response to FacebookPageProfile array
   * @param userAccessToken the user access token
   * @return FacebookPageProfile[] all Facebook pages
   */
  getPages = async (userAccessToken: string): Promise<FacebookPageProfile[]> => {
    const params = {
      fields: 'picture{url},name,id,category',
      access_token: userAccessToken,
    };
    const res = await axios.get('https://graph.facebook.com/v13.0/me/accounts', { params });
    const { data } = res.data;
    type RawFacebookPage = FacebookPageProfile & { picture: { data: { url: string } } };
    return data.map((item: RawFacebookPage) => ({
      id: item.id,
      name: item.name,
      picture: item.picture.data.url,
      category: item.category,
    }));
  }
}
