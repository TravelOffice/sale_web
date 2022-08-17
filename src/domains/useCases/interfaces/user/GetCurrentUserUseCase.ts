import { User } from '@domain/entities/User';

export interface GetCurrentUserUseCase {
  invoke: () => Promise<User>
}
