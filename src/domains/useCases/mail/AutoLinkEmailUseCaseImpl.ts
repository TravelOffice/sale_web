import { AutoLinkEmailUseCase } from '@domain/useCases/interfaces/mail/AutoLinkEmailUseCase';
import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';
import { mailRepository } from '@adapter/repositories';

export default class AutoLinkEmailUseCaseImpl implements AutoLinkEmailUseCase {
  invoke = async (request: AutoLinkEmailRequest) => mailRepository.autoLinkEmail(request);
}
