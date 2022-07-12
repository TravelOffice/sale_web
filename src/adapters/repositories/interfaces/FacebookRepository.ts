import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';

export interface FacebookRepository {
  getPages: (userAccessToken: string) => Promise<FacebookPageProfile[]>
}
