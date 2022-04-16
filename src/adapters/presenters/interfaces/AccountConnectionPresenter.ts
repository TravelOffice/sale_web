import { FacebookPage } from '@domain/entities/FacebookPage';

export interface AccountConnectionPresenter {
  getFacebookPages: (userAccessToken: string) => Promise<FacebookPage[]>
}
