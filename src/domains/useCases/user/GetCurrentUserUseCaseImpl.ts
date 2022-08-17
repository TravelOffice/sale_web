import { userRepository } from '@adapter/repositories';
import { User } from '@domain/entities/User';
import { GetCurrentUserUseCase } from '../interfaces/user/GetCurrentUserUseCase';

export default class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
  invoke = async (): Promise<User> => userRepository.getCurrentUser();
}
