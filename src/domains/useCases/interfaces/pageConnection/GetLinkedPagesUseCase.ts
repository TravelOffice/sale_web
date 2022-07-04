import { Page } from '@domain/entities/Page';

export interface GetLinkedPagesUseCase {
  invoke: () => Promise<Array<Page>>
}
