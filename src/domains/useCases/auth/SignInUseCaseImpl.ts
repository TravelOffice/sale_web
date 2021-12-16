import SignInUseCase from '@domain/useCases/interfaces/auth/SignInUseCase';
import { authRepository } from '@adapter/repositories';

/**
 * Implementation of sign-in use case, which can be used in sign in flow.
 */
export default class SignInUseCaseImpl implements SignInUseCase {
  signIn = async (email: string, password: string) => authRepository.signIn(email, password);
}
