import { AuthPresenter } from '@adapter/presenters/interfaces/AuthPresenter';
import { getCurrentUserUseCase, signInUseCase } from '@domain/useCases';

export default class AuthPresenterImpl implements AuthPresenter {
  signIn = (username: string, password: string) => signInUseCase.signIn(username, password);

  getCurrentUser = async () => getCurrentUserUseCase.getCurrentUser();
}
