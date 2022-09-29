import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface MailPresenter {
  linkMail: (formData: LinkEmailFormData) => Promise<MailAccount>
  getMailAccounts: () => Promise<MailAccount[]>
  getMailboxes: (mailAccount: string) => Promise<Mailbox[]>
  getMailMessages: (mailAccount: string, mailbox: string) => Promise<MailMessageList>
  getMailThread: (mailAccount: string, mailbox: string, mailId: string) => Promise<MailMessage[]>
}
