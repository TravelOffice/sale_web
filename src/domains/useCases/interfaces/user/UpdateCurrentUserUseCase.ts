import { UpdateAccountFormData, User } from '@domain/entities/User';

export interface UpdateCurrentUserUseCase {
  invoke: (user: UpdateAccountFormData) => Promise<User>
}
