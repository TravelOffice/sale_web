import { apiProvider, sessionStorageProvider } from '@adapter/infrastructures';
import UserRepository from './interfaces/UserRepository';

export default class UserRepositoryImpl implements UserRepository {
  getUser = async (id: string) => apiProvider.authorizedRequest.get(`/users/${id}`)

  getCurrentUser = async () => {
    const response = await apiProvider.authorizedRequest.get('/me');
    return response.data;
  }

  getLinkedPages = async () => {
    // Use caching to reduce calling to the backend
    const cachedKey = 'linked_pages';
    const cachedPagesInJSON: string = await sessionStorageProvider.getItem(cachedKey);
    if (cachedPagesInJSON) {
      return JSON.parse(cachedPagesInJSON);
    }
    const response = await apiProvider.authorizedRequest.get('/me/linked_pages');
    const linkedPages = response.data;
    await sessionStorageProvider.setItem(cachedKey, JSON.stringify(linkedPages));
    return linkedPages;
  }
}
