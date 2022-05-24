import { GetLinkedFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/GetLinkedFacebookPageUseCase';
import { pageConnectionRepository } from '@adapter/repositories';

export default class GetLinkedFacebookPageUseCaseImpl implements GetLinkedFacebookPageUseCase {
  invoke = async () => pageConnectionRepository.getLinkedFacebookPage()
}
