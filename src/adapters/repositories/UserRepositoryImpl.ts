import { apiProvider, sessionStorageProvider } from '@adapter/infrastructures';
import { UpdateAccountFormData, User } from '@domain/entities/User';
import UserRepository from './interfaces/UserRepository';

export default class UserRepositoryImpl implements UserRepository {
  getUser = async (id: string) => apiProvider.authorizedRequest.get(`/users/${id}`)

  getCurrentUser = async () => {
    const response = await apiProvider.authorizedRequest.get('/me');
    return response.data;
  }

  updateCurrentUser = async (user: UpdateAccountFormData) => {
    const response = await apiProvider.authorizedRequest.put('/me', user);
    return response.data;
  }

  getAllUsers = async () => {
    const response = await apiProvider.authorizedRequest.get('/users');
    return response.data;
  }

  addUser = async (user: User) => {
    await apiProvider.authorizedRequest.post('/users', user);
    return user;
  }

  updateUser = async (user: User) => {
    /* eslint-disable no-unused-vars */
    const {
      username,
      ...updateUser
    } = user;
    /* eslint-enable no-unused-vars */
    await apiProvider.authorizedRequest.put(`/users/${user.username}`, updateUser);
    return user;
  }

  getLinkedPages = async (refresh: boolean) => {
    // Use caching to reduce calling to the backend
    const cachedKey = 'linked_pages';
    if (!refresh) {
      const cachedPagesInJSON: string = await sessionStorageProvider.getItem(cachedKey);
      if (cachedPagesInJSON) {
        return JSON.parse(cachedPagesInJSON);
      }
    }
    const response = await apiProvider.authorizedRequest.get('/admin/linked_pages');
    const linkedPages = response.data;
    await sessionStorageProvider.setItem(cachedKey, JSON.stringify(linkedPages));
    return linkedPages;
  }
}
