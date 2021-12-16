import AuthRepository from '@adapter/repositories/interfaces/AuthRepository';
import { authProvider } from '@adapter/infrastructures';
import AdminUser from '@domain/entities/AdminUser';

export default class AuthRepositoryImpl implements AuthRepository {
  signIn = async (
    username: string,
    password: string,
  ) => {
    await authProvider.signIn(username, password);
    return (await this.getCurrentUser())!;
  }

  getCurrentUser = async () => authProvider.getCurrentUser()
}
