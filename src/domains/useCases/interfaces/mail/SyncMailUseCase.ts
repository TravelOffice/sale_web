import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface SyncMailUseCase {
  invoke: (mailAccounts: MailAccount[]) => Promise<void>
}
