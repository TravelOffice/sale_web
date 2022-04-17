import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import { connectFacebookPageUseCase, getFacebookPagesUseCase } from '@domain/useCases';
import { FacebookPage } from '@domain/entities/FacebookPage';

export default class AccountConnectionPresenterImpl implements AccountConnectionPresenter {
  getFacebookPages = async (
    userAccessToken: string,
  ) => getFacebookPagesUseCase.invoke(userAccessToken);

  connectFacebookPage = async (
    userAccessToken: string,
    page: FacebookPage,
  ) => connectFacebookPageUseCase.invoke(userAccessToken, page);
}
