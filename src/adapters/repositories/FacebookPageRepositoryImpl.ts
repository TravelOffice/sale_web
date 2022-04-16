import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import { FacebookPage } from '@domain/entities/FacebookPage';
import axios from 'axios';

export default class FacebookPageRepositoryImpl implements FacebookRepository {
  /**
   * Get all Facebook pages which the user manages using user access token,
   * then convert response to FacebookPage array
   * @param userAccessToken the user access token
   * @return FacebookPage[] all Facebook pages
   */
  getPages = async (userAccessToken: string): Promise<FacebookPage[]> => {
    const params = {
      fields: 'picture{url},name,id,category',
      access_token: userAccessToken,
    };
    const res = await axios.get('https://graph.facebook.com/v13.0/me/accounts', { params });
    const { data } = res.data;
    type RawFacebookPage = FacebookPage & { picture: { data: { url: string } } };
    return data.map((item: RawFacebookPage) => ({
      id: item.id,
      name: item.name,
      picture: item.picture.data.url,
      category: item.category,
    }));
  }
}
