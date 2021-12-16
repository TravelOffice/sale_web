import AdminUser from '@domain/entities/AdminUser';

export default interface AuthRepository {
  signIn: (username: string, password: string) => Promise<AdminUser>,
  getCurrentUser: () => Promise<AdminUser | undefined>
}
