import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { EmailAddress } from '@domain/entities/mail/EmailAddress';

export interface SendMailFormData {
  messageId?: string,
  from: EmailAddress[],
  to: EmailAddress[],
  cc: EmailAddress[],
  bcc: EmailAddress[],
  subject: string,
  htmlContent: string,
  attachments: MailAttachment[],
}
