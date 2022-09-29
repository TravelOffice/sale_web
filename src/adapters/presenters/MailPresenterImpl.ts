import { MailPresenter } from '@adapter/presenters/interfaces/MailPresenter';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import {
  getMailAccountsUseCase, getMailboxesUseCase, getMailMessagesUseCase,
  getMailThreadUseCase, linkMailUseCase,
} from '@domain/useCases';

export default class MailPresenterImpl implements MailPresenter {
  linkMail = async (formData: LinkEmailFormData) => linkMailUseCase.invoke(formData)

  getMailAccounts = async () => getMailAccountsUseCase.invoke()

  getMailboxes = async (mailAccount: string) => getMailboxesUseCase.invoke(mailAccount)

  getMailMessages = async (
    mailAccount: string,
    mailbox: string,
  ) => getMailMessagesUseCase.invoke(mailAccount, mailbox)

  getMailThread = async (
    mailAccount: string,
    mailbox: string,
    mailId: string,
  ) => getMailThreadUseCase.invoke(mailAccount, mailbox, mailId)
}
