import SignInUseCase from '@domain/useCases/interfaces/auth/SignInUseCase';
import SignInUseCaseImpl from '@domain/useCases/auth/SignInUseCaseImpl';
import { GetCurrentUserUseCase } from '@domain/useCases/interfaces/auth/GetCurrentUserUseCase';
import GetCurrentUserUseCaseImpl from '@domain/useCases/auth/GetCurrentUserUseCaseImpl';

interface UseCases {
  signInUseCase: SignInUseCase,
  getCurrentUserUseCase: GetCurrentUserUseCase,
}

const useCases : UseCases = {
  signInUseCase: new SignInUseCaseImpl(),
  getCurrentUserUseCase: new GetCurrentUserUseCaseImpl(),
};

export const {
  signInUseCase,
  getCurrentUserUseCase,
} = useCases;
