import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';
import { MailServer } from '@domain/entities/mail/MailServer';
import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';
import { ChangeMailboxRequest } from '@domain/entities/mail/ChangeMailboxRequest';

export interface MailPresenter {
  getSearchToken: () => Promise<string>
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
  syncMail: (mailAccounts: MailAccount[]) => Promise<void>
  search: (mailAccount: MailAccount, query: string) => Promise<MailSearchResult[]>
  draftMail: (sendMailFormData: SendMailFormData) => Promise<MailMessage>
  deleteMail: (request: DeleteMailRequest) => Promise<void>
  getMailServer: (mailAddress: string) => Promise<MailServer>
  autoLinkEmail: (request: AutoLinkEmailRequest) => Promise<MailAccount>
  changeMailbox: (request: ChangeMailboxRequest) => Promise<void>
}
