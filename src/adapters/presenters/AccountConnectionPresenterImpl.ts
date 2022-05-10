import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import {
  connectFacebookPageUseCase,
  connectZaloPageUseCase,
  getFacebookPagesUseCase,
  getZaloOAuthLinkUseCase,
} from '@domain/useCases';
import { FacebookPage } from '@domain/entities/FacebookPage';

export default class AccountConnectionPresenterImpl implements AccountConnectionPresenter {
  getFacebookPages = async (
    userAccessToken: string,
  ) => getFacebookPagesUseCase.invoke(userAccessToken);

  connectFacebookPage = async (
    userAccessToken: string,
    page: FacebookPage,
  ) => connectFacebookPageUseCase.invoke(userAccessToken, page);

  getZaloOAuthLink = async () => getZaloOAuthLinkUseCase.invoke()

  connectZaloPage = async (
    pageId: string,
    state: string,
    authorizationCode: string,
  ) => connectZaloPageUseCase.invoke(pageId, state, authorizationCode);
}
