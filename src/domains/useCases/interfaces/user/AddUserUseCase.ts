import { User } from '@domain/entities/User';

export interface AddUserUseCase {
  invoke: (user: User) => Promise<User>
}
