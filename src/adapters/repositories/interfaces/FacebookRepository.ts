import { FacebookPage } from '@domain/entities/FacebookPage';

export interface FacebookRepository {
  getPages: (userAccessToken: string) => Promise<FacebookPage[]>
}
