import { FacebookPage } from '@domain/entities/chat/facebook/FacebookPage';

export interface GetFacebookPagesUseCase {
  invoke: (userAccessToken: string) => Promise<FacebookPage[]>
}
