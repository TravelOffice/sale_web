import { GetMailServerUseCase } from '@domain/useCases/interfaces/mail/GetMailServerUseCase';
import { mailRepository } from '@adapter/repositories';

export default class GetMailServerUseCaseImpl implements GetMailServerUseCase {
  invoke = async (mailAddress: string) => mailRepository.getMailServer(mailAddress);
}
