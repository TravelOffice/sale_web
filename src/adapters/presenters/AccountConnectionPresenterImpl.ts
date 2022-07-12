import { AccountConnectionPresenter } from '@adapter/presenters/interfaces/AccountConnectionPresenter';
import {
  connectFacebookPageUseCase,
  connectTelegramPageUseCase,
  connectZaloPageUseCase,
  getFacebookPagesUseCase,
  getLinkedPagesUseCase,
  getZaloOAuthLinkUseCase,
  unlinkPageUseCase,
} from '@domain/useCases';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

export default class AccountConnectionPresenterImpl implements AccountConnectionPresenter {
  getFacebookPages = async (
    userAccessToken: string,
  ) => getFacebookPagesUseCase.invoke(userAccessToken);

  connectFacebookPage = async (
    userAccessToken: string,
    page: FacebookPageProfile,
  ) => connectFacebookPageUseCase.invoke(userAccessToken, page);

  getZaloOAuthLink = async () => getZaloOAuthLinkUseCase.invoke()

  connectZaloPage = async (
    pageId: string,
    state: string,
    authorizationCode: string,
  ) => connectZaloPageUseCase.invoke(pageId, state, authorizationCode);

  connectTelegramPage = async (botToken: string) => connectTelegramPageUseCase.invoke(botToken)

  getLinkedPages = async (refresh: boolean) => getLinkedPagesUseCase.invoke(refresh);

  unlinkPage = async (
    platform: ChatPlatform, pageId: string,
  ) => unlinkPageUseCase.invoke(platform, pageId);
}
