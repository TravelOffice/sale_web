import { Page } from '@domain/entities/Page';

export interface GetLinkedFacebookPageUseCase {
  invoke: () => Promise<Page>
}
