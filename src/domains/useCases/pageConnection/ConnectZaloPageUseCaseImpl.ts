import { ConnectZaloPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectZaloPageUseCase';
import { pageConnectionRepository } from '@adapter/repositories';

export default class ConnectZaloPageUseCaseImpl implements ConnectZaloPageUseCase {
  invoke = async (
    pageId: string,
    state: string,
    authorizationCode: string,
  ) => pageConnectionRepository.connectZaloPage(pageId, state, authorizationCode);
}
