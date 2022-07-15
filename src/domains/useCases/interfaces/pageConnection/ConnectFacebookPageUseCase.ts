import { FacebookPage } from '@domain/entities/chat/facebook/FacebookPage';

export interface ConnectFacebookPageUseCase {
  invoke: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
}
