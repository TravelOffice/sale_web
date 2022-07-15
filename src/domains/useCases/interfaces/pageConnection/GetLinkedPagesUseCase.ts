import { Page } from '@domain/entities/chat/Page';

export interface GetLinkedPagesUseCase {
  invoke: (refresh: boolean) => Promise<Array<Page>>
}
