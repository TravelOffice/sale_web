import { User } from '@domain/entities/User';

export interface UserPresenter {
  getCurrentUser: () => Promise<User>;
  getAllUsers: () => Promise<Array<User>>;
}
