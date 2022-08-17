import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import { getCurrentUserUseCase, getAllUsersUseCase } from '@domain/useCases';

export default class UserPresenterImpl implements UserPresenter {
  getCurrentUser = async () => getCurrentUserUseCase.invoke();

  getAllUsers = async () => getAllUsersUseCase.invoke();
}
