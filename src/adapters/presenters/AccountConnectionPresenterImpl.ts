import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import {
  connectFacebookPageUseCase,
  connectZaloPageUseCase,
  getFacebookPagesUseCase,
  getLinkedPagesUseCase,
  getZaloOAuthLinkUseCase,
  unlinkPageUseCase,
} from '@domain/useCases';
import { FacebookPage } from '@domain/entities/FacebookPage';
import { ChatPlatform } from '@domain/entities/ChatPlatform';

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

  getLinkedPages = async (refresh: boolean) => getLinkedPagesUseCase.invoke(refresh);

  unlinkPage = async (
    platform: ChatPlatform, pageId: string,
  ) => unlinkPageUseCase.invoke(platform, pageId);
}
