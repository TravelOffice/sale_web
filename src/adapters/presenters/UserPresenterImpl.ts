import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import { getCurrentUserUseCase } from '@domain/useCases';

export default class UserPresenterImpl implements UserPresenter {
  getCurrentUser = async () => getCurrentUserUseCase.invoke();
}
