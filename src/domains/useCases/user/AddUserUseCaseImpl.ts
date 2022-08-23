import { userRepository } from '@adapter/repositories';
import { User } from '@domain/entities/User';
import { AddUserUseCase } from '../interfaces/user/AddUserUseCase';

export default class AddUserUseCaseImpl implements AddUserUseCase {
  invoke = async (user: User) : Promise<User> => userRepository.addUser(user);
}
