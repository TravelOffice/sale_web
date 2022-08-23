import { User } from '@domain/entities/User';

export interface UpdateUserUseCase {
  invoke: (user: User) => Promise<User>
}
