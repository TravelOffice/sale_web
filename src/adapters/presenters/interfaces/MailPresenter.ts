import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';

export interface MailPresenter {
  linkMail: (formData: LinkEmailFormData) => Promise<MailAccount>
  getMailAccounts: () => Promise<MailAccount[]>
  getMailboxes: (mailAccount: string) => Promise<Mailbox[]>
  getMailMessages: (
    mailAccount: string,
    mailbox: string,
    nextToken?: string,
  ) => Promise<MailMessageList>
  getMailThread: (mailAccount: string, mailbox: string, mailId: string) => Promise<MailMessage[]>
  sendMail: (sendMailFormData: SendMailFormData) => Promise<MailMessage>
  uploadMailAttachment: (file: File) => Promise<MailAttachment>
}
