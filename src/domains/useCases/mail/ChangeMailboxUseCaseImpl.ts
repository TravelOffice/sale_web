import { ChangeMailboxUseCase } from '@domain/useCases/interfaces/mail/ChangeMailboxUseCase';
import { mailRepository } from '@adapter/repositories';
import { ChangeMailboxRequest } from '@domain/entities/mail/ChangeMailboxRequest';

export default class ChangeMailboxUseCaseImpl implements ChangeMailboxUseCase {
  invoke = async (request: ChangeMailboxRequest) => mailRepository.changeMailbox(request);
}
