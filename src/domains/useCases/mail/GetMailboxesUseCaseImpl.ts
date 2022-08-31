import { GetMailboxesUseCase } from '@domain/useCases/interfaces/mail/GetMailboxesUseCase';
import { mailRepository } from '@adapter/repositories';

export default class GetMailboxesUseCaseImpl implements GetMailboxesUseCase {
  invoke = async (mailAccount: string) => mailRepository.getMailboxes(mailAccount);
}
