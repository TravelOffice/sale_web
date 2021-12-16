import AdminUser from '@domain/entities/AdminUser';

export interface GetCurrentUserUseCase {
  getCurrentUser: () => Promise<AdminUser | undefined>
}
