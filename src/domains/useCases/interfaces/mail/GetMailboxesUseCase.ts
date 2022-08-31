import { Mailbox } from '@domain/entities/mail/Mailbox';

export interface GetMailboxesUseCase {
  invoke: (mailAccount: string) => Promise<Mailbox[]>
}
