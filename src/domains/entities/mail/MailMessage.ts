import { MailAddress } from '@domain/entities/mail/MailAddress';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';

export interface MailMessage {
  messageId: string,
  subject: string,
  receivedDate?: number,
  sentDate: number,
  briefContent: string,
  htmlContent: string,
  flags: string,
  from: MailAddress[],
  to: MailAddress[],
  cc?: MailAddress[],
  bcc?: MailAddress[],
  isStarred?: boolean,
  attachments: MailAttachment[],
  labels: string[],
  inReplyTo?: string,
}
