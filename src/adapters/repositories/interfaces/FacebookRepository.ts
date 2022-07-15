import { FacebookPage } from '@domain/entities/chat/facebook/FacebookPage';

export interface FacebookRepository {
  getPages: (userAccessToken: string) => Promise<FacebookPage[]>
}
