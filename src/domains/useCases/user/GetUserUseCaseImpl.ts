import { userRepository } from '@adapter/repositories';
import { User } from '@domain/entities/User';
import { GetUserUseCase } from '../interfaces/user/GetUserUseCase';

export default class GetUserUseCaseImpl implements GetUserUseCase {
  invoke = async (userId: string): Promise<User> => userRepository.getUser(userId);
}
