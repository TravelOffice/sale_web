import { GetMailMessagesUseCase } from '@domain/useCases/interfaces/mail/GetMailMessagesUseCase';
import { mailRepository } from '@adapter/repositories';

export default class GetMailMessagesUseCaseImpl implements GetMailMessagesUseCase {
  invoke = async (
    mailAccount: string,
    mailbox: string,
  ) => mailRepository.getMails(mailAccount, mailbox);
}
