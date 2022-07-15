import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';

export interface GetFacebookUserInfoUseCase {
  invoke: (pageId: string, userId: string) => Promise<FacebookUserInfo>
}
