import { ConnectTelegramPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectTelegramPageUseCase';
import { pageConnectionRepository } from '@adapter/repositories';

export default class ConnectTelegramPageUseCaseImpl implements ConnectTelegramPageUseCase {
  invoke = async (botToken: string) => pageConnectionRepository.connectTelegramPage(botToken)
}
