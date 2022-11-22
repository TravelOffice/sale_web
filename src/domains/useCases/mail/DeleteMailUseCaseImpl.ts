import { mailRepository } from '@adapter/repositories';
import { DeleteMailUseCase } from '@domain/useCases/interfaces/mail/DeleteMailUseCase';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';

export default class DeleteMailUseCaseImpl implements DeleteMailUseCase {
  invoke = async (request: DeleteMailRequest) => mailRepository.deleteMail(request)
}
