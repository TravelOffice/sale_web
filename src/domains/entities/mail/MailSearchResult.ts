import { MailAddress } from '@domain/entities/mail/MailAddress';

export interface MailSearchResult {
  from: MailAddress[],
  to: MailAddress[],
  cc: MailAddress[],
  bcc: MailAddress[],
  content: string,
  id: string,
  messageId: string,
  box: string,
  date: string,
  flags: string[],
  _formatted: MailSearchResult,
}
