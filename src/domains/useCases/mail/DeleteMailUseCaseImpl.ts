import { mailRepository } from '@adapter/repositories';
import { DeleteMailUseCase } from '@domain/useCases/interfaces/mail/DeleteMailUseCase';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';
import { ChangeMailboxRequest } from '@domain/entities/mail/ChangeMailboxRequest';

export default class DeleteMailUseCaseImpl implements DeleteMailUseCase {
  invoke = async (request: DeleteMailRequest) => {
    const { mailbox } = request;
    if (mailbox === 'DELETE') {
      await mailRepository.deleteMail(request);
    } else {
      const changeMailboxRequest = {
        from: request.mailbox,
        to: 'DELETE',
        mail: request.email,
        messages: request.messagesId,
      } as ChangeMailboxRequest;
      await mailRepository.changeMailbox(changeMailboxRequest);
    }
  }
}
