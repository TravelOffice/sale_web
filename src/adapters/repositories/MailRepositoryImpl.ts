import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailApiProvider, mailSearchProvider } from '@adapter/infrastructures';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { syncEmail } from '@graphql/queries';
import graphqlClient from '@graphql/client';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';
import { ChangeMailboxRequest } from '@domain/entities/mail/ChangeMailboxRequest';
import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';

export default class MailRepositoryImpl implements MailRepository {
  private readonly client = mailApiProvider.authorizedRequest;

  getSearchToken = async () => this.client.get<string>('/search-token')

  link = async (formData: LinkEmailFormData) => this.client.post<MailAccount>('/link-email', formData);

  syncEmail = async (mailAccounts: MailAccount[]) => {
    mailAccounts.forEach((account) => {
      graphqlClient.query({ query: syncEmail, variables: { email: account.email, mailbox: 'INBOX' } });
    });
  }

  getMailAccounts = async () => this.client.get<MailAccount[]>('/mail-accounts');

  getMailboxes = async (mailAccount: string) => this.client.get<Mailbox[]>('/mail-boxes', { queryParams: { email: mailAccount } });

  getMails = async (mailAccount: string, mailbox: string, nextToken?: string) => this.client.get<MailMessageList>('/mails', { queryParams: { email: mailAccount, mailbox, token: nextToken } })

  getMailThread = async (
    mailAccount: string,
    mailbox: string,
    mailId: string,
  ) => this.client.get<MailMessage[]>(`/mails/${mailId}`, { queryParams: { email: mailAccount, mailbox } })

  sendMail = async (sendMailFormData: SendMailFormData) => this.client.post<MailMessage>('/send-email', sendMailFormData);

  search = async (indexUid: string, query: string) => {
    const result = await mailSearchProvider.query(indexUid, query, {
      attributesToHighlight: ['*'],
      sort: ['date:desc'],
      attributesToCrop: ['content'],
      cropLength: 20,
    });
    return result.hits;
  }

  draftMail = async (sendMailFormData: SendMailFormData): Promise<MailMessage> => this.client.post('draft-email', sendMailFormData);

  deleteMail = async (request: DeleteMailRequest) => this.client.delete<void>('mails', { data: request });

  changeMailbox = async (request: ChangeMailboxRequest): Promise<void> => this.client.post('mails/change-mailbox', request);

  /**
   * Get mail server information by given mail address
   * @param mailAddress the given mail address
   */
  getMailServer = async (mailAddress: string) => this.client.get('/autolink-email', { queryParams: { email: mailAddress } });

  /**
   * Method to auto link a mail address using pre-config mail server
   * @param request includes information to link such as emai
   */
  autoLinkEmail = async (request: AutoLinkEmailRequest) => this.client.post('/autolink-email', request);
}
