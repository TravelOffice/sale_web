import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';

export interface ConnectFacebookPageUseCase {
  invoke: (userAccessToken: string, page: FacebookPageProfile) => Promise<FacebookPageProfile>
}
