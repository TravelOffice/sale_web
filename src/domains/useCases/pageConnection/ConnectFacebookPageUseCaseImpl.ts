import { FacebookPage } from '@domain/entities/FacebookPage';
import { pageConnectionRepository } from '@adapter/repositories';
import { ConnectFacebookPageUseCase } from '../interfaces/pageConnection/ConnectFacebookPageUseCase';

export default class ConnectFacebookPageUseCaseImpl implements ConnectFacebookPageUseCase {
  invoke = async (
    userAccessToken: string, page: FacebookPage,
  ) => pageConnectionRepository.connectFacebookPage(userAccessToken, page)
}
