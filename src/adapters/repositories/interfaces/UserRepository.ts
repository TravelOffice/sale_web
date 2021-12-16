import AdminUser from '@domain/entities/AdminUser';

export default interface UserRepository {
  getUser: (id: string) => Promise<AdminUser>,
}
