import AdminUser from '@domain/entities/AdminUser';

export interface AuthPresenter {
  signIn: (username: string, password: string) => Promise<AdminUser>

  getCurrentUser: () => Promise<AdminUser | undefined>
}
