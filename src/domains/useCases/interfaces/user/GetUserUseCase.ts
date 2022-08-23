import { User } from '@domain/entities/User';

export interface GetUserUseCase {
  invoke: (userId: string) => Promise<User>
}
