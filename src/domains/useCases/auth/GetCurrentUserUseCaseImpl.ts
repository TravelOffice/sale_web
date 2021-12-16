import { GetCurrentUserUseCase } from '@domain/useCases/interfaces/auth/GetCurrentUserUseCase';
import { authRepository } from '@adapter/repositories';

export default class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
  getCurrentUser = async () => authRepository.getCurrentUser()
}
