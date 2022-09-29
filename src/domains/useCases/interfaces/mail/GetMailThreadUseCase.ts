import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface GetMailThreadUseCase {
  invoke: (mailAccount: string, mailbox: string, mailId: string) => Promise<MailMessage[]>
}
