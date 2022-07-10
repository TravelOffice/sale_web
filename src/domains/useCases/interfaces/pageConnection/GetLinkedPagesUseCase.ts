import { Page } from '@domain/entities/Page';

export interface GetLinkedPagesUseCase {
  invoke: (refresh: boolean) => Promise<Array<Page>>
}
