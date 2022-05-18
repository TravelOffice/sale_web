import { ZaloPageRepository } from '@adapter/repositories/interfaces/ZaloPageRepository';
import { apiProvider } from '@adapter/infrastructures';

export default class ZaloPageRepositoryImpl implements ZaloPageRepository {
  getOAuthLink = async () => {
    const response = await apiProvider.authorizedRequest.get('/zalo/link');
    return response.data;
  };
}
