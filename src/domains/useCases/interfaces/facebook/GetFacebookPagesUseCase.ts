import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';

export interface GetFacebookPagesUseCase {
  invoke: (userAccessToken: string) => Promise<FacebookPageProfile[]>
}
