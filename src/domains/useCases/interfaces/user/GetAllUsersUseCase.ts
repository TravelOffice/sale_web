import { User } from '@domain/entities/User';

export interface GetAllUsersUseCase {
  invoke: () => Promise<Array<User>>
}
