import { userRepository } from '@adapter/repositories';
import { User } from '@domain/entities/User';
import { GetAllUsersUseCase } from '../interfaces/user/GetAllUsersUseCase';

export default class GetAllUsersUseCaseImpl implements GetAllUsersUseCase {
  invoke = async (): Promise<Array<User>> => userRepository.getAllUsers();
}
