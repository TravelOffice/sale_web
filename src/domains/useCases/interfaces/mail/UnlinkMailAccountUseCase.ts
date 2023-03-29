import { MailAccount } from '@domain/entities/mail/MailAccount';

export interface UnlinkMailAccountUseCase {
  invoke: (mailAccount: MailAccount) => Promise<void>,
}
