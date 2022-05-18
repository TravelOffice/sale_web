import { GetZaloOAuthLinkUseCase } from '@domain/useCases/interfaces/zalo/GetZaloOAuthLinkUseCase';
import { zaloPageRepository } from '@adapter/repositories';

export default class GetZaloOAuthLinkUseCaseImpl implements GetZaloOAuthLinkUseCase {
  invoke = async () => zaloPageRepository.getOAuthLink()
}
