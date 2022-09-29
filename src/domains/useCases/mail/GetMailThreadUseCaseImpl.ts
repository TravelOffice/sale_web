import { GetMailThreadUseCase } from '@domain/useCases/interfaces/mail/GetMailThreadUseCase';
import { mailRepository } from '@adapter/repositories';

export default class GetMailThreadUseCaseImpl implements GetMailThreadUseCase {
  invoke = async (
    mailAccount: string,
    mailbox: string,
    mailId: string,
  ) => mailRepository.getMailThread(mailAccount, mailbox, mailId)
}
