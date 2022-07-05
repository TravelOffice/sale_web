import { apiProvider } from '@adapter/infrastructures';
import UserRepository from './interfaces/UserRepository';

export default class UserRepositoryImpl implements UserRepository {
  getUser = async (id: string) => apiProvider.authorizedRequest.get(`/users/${id}`)

  getCurrentUser = async () => {
    const response = await apiProvider.authorizedRequest.get('/me');
    return response.data;
  }

  getLinkedPages = async () => {
    const response = await apiProvider.authorizedRequest.get('/me/linked_pages');
    return response.data;
  }
}
