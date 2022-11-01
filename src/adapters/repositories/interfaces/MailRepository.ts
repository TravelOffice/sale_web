import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { MailServer } from '@domain/entities/mail/MailServer';

export interface MailRepository {
  link: (formData: LinkEmailFormData) => Promise<MailAccount>,
  syncEmail: (mailAccounts: MailAccount[]) => Promise<void>
  getMailAccounts: () => Promise<MailAccount[]>
  getMailboxes: (mailAccount: string) => Promise<Mailbox[]>
  getMails: (mailAccount: string, mailbox: string, nextToken?: string) => Promise<MailMessageList>
  getMailThread: (mailAccount: string, mailbox: string, mailId: string) => Promise<MailMessage[]>
  sendMail: (sendMailFormData: SendMailFormData) => Promise<MailMessage>
  search: (indexUid: string, query: string) => Promise<MailSearchResult[]>
  getMailServer: (mailAddress: string) => Promise<MailServer>
}
