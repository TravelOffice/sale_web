import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailApiProvider } from '@adapter/infrastructures';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';

export default class MailRepositoryImpl implements MailRepository {
  private readonly client = mailApiProvider.authorizedRequest;

  link = async (formData: LinkEmailFormData) => this.client.post<MailAccount>('/link-email', formData);

  getMailAccounts = async () => this.client.get<MailAccount[]>('/mail-accounts');

  getMailboxes = async (mailAccount: string) => this.client.get<Mailbox[]>('/mail-boxes', { queryParams: { email: mailAccount } });

  getMails = async (mailAccount: string, mailbox: string) => this.client.get<MailMessageList>('/mails', { queryParams: { email: mailAccount, mailbox } })
}
