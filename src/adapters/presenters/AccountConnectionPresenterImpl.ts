import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import { getFacebookPagesUseCase } from '@domain/useCases';

export default class AccountConnectionPresenterImpl implements AccountConnectionPresenter {
  getFacebookPages = async (
    userAccessToken: string,
  ) => getFacebookPagesUseCase.invoke(userAccessToken);
}
