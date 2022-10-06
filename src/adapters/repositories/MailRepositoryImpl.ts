import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailApiProvider } from '@adapter/infrastructures';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';

export default class MailRepositoryImpl implements MailRepository {
  private readonly client = mailApiProvider.authorizedRequest;

  link = async (formData: LinkEmailFormData) => this.client.post<MailAccount>('/link-email', formData);

  getMailAccounts = async () => this.client.get<MailAccount[]>('/mail-accounts');

  getMailboxes = async (mailAccount: string) => this.client.get<Mailbox[]>('/mail-boxes', { queryParams: { email: mailAccount } });

  getMails = async (mailAccount: string, mailbox: string, nextToken?: string) => this.client.get<MailMessageList>('/mails', { queryParams: { email: mailAccount, mailbox, token: nextToken } })

  getMailThread = async (
    mailAccount: string,
    mailbox: string,
    mailId: string,
  ) => this.client.get<MailMessage[]>(`/mails/${mailId}`, { queryParams: { email: mailAccount, mailbox } })

  sendMail = async (sendMailFormData: SendMailFormData) => this.client.post<MailMessage>('/send-email', sendMailFormData)
}
