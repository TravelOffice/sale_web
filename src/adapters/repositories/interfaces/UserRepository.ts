import User from '@domain/entities/User';

export default interface UserRepository {
  getUser: (id: string) => Promise<User>,
  getCurrentUser: () => Promise<User>,
}
