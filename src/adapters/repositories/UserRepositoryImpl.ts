import { apiProvider } from '@adapter/infrastructures';
import { UpdateAccountFormData, User } from '@domain/entities/User';
import UserRepository from './interfaces/UserRepository';

export default class UserRepositoryImpl implements UserRepository {
  getUser = async (id: string) => {
    const response = await apiProvider.authorizedRequest.get(`/users/${id}`);
    return response.data;
  }

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

  getLinkedPages = async () => {
    // Use caching to reduce calling to the backend
    const response = await apiProvider.authorizedRequest.get('/admin/linked_pages');
    return response.data;
  }
}
