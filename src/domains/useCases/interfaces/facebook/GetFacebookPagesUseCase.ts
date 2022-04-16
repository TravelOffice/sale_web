import { FacebookPage } from '@domain/entities/FacebookPage';

export interface GetFacebookPagesUseCase {
  invoke: (userAccessToken: string) => Promise<FacebookPage[]>
}
