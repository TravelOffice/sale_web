import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface MailMessageList {
  mails: MailMessage[],
  token: string,
}
