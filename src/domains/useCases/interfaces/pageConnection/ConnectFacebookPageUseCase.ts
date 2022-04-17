import { FacebookPage } from '@domain/entities/FacebookPage';

export interface ConnectFacebookPageUseCase {
  invoke: (userAccessToken: string, page: FacebookPage) => Promise<FacebookPage>
}
