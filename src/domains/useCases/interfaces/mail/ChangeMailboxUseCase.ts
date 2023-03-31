import { ChangeMailboxRequest } from '@domain/entities/mail/ChangeMailboxRequest';

export interface ChangeMailboxUseCase {
  invoke: (request: ChangeMailboxRequest) => Promise<void>
}
