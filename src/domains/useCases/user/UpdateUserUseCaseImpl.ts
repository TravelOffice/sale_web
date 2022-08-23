import { userRepository } from '@adapter/repositories';
import { User } from '@domain/entities/User';
import { UpdateUserUseCase } from '../interfaces/user/UpdateUserUseCase';

export default class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  invoke = async (user: User) : Promise<User> => userRepository.updateUser(user);
}
