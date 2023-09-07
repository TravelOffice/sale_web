import { mailRepository } from '@adapter/repositories';
import { GetSearchTokenUseCase } from '@domain/useCases/interfaces/mail/GetSearchTokenUseCase';

export default class GetSearchTokenUseCaseImpl implements GetSearchTokenUseCase {
  invoke = async () => mailRepository.getSearchToken()
}
