import { FacebookUserInfo } from '@domain/entities/FacebookUserInfo';

export interface GetFacebookUserInfoUseCase {
  invoke: (pageId: string, userId: string) => Promise<FacebookUserInfo>
}
