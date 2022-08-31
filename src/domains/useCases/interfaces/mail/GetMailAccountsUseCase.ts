import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface GetMailAccountsUseCase {
  invoke: () => Promise<MailAccount[]>
}
