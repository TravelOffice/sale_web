import { MailServer } from '@domain/entities/mail/MailServer';

export interface GetMailServerUseCase {
  invoke: (mailAddress: string) => Promise<MailServer>
}
