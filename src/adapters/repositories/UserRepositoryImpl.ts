import { apiProvider } from '@adapter/infrastructures';
import UserRepository from './interfaces/UserRepository';

export default class UserRepositoryImpl implements UserRepository {
  getUser = async (id: string) => apiProvider.authorizedRequest.get(`/users/${id}`)
}
