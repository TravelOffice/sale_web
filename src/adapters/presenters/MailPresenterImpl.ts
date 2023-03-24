import { MailPresenter } from '@adapter/presenters/interfaces/MailPresenter';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import {
  getMailAccountsUseCase, getMailboxesUseCase, getMailMessagesUseCase,
  getMailThreadUseCase, linkMailUseCase, sendMailUseCase, uploadMailAttachmentUseCase,
  syncMailUseCase, searchMailUseCase, draftMailUseCase, deleteMailUseCase, getMailServerUseCase,
  autoLinkEmailUseCase,
} from '@domain/useCases';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';
import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';

export default class MailPresenterImpl implements MailPresenter {
  linkMail = async (formData: LinkEmailFormData) => linkMailUseCase.invoke(formData)

  getMailAccounts = async () => getMailAccountsUseCase.invoke()

  getMailboxes = async (mailAccount: string) => getMailboxesUseCase.invoke(mailAccount)

  getMailMessages = async (
    mailAccount: string,
    mailbox: string,
    nextToken?: string,
  ) => getMailMessagesUseCase.invoke(mailAccount, mailbox, nextToken)

  getMailThread = async (
    mailAccount: string,
    mailbox: string,
    mailId: string,
  ) => getMailThreadUseCase.invoke(mailAccount, mailbox, mailId)

  sendMail = async (formData: SendMailFormData) => sendMailUseCase.invoke(formData)

  uploadMailAttachment = async (file: File) => uploadMailAttachmentUseCase.invoke(file)

  search = async (
    mailAccount: MailAccount,
    query: string,
  ) => searchMailUseCase.query(mailAccount, query);

  syncMail = async (mailAccounts: MailAccount[]) => syncMailUseCase.invoke(mailAccounts)

  draftMail = async (formData: SendMailFormData) => draftMailUseCase.invoke(formData)

  deleteMail = async (request: DeleteMailRequest) => deleteMailUseCase.invoke(request)

  getMailServer = async (mailAddress: string) => getMailServerUseCase.invoke(mailAddress);

  autoLinkEmail = async (request: AutoLinkEmailRequest) => autoLinkEmailUseCase.invoke(request);
}
