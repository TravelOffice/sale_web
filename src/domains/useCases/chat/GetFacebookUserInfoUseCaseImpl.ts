import { GetFacebookUserInfoUseCase } from '@domain/useCases/interfaces/chat/GetFacebookUserInfoUseCase';
import { chatRepository } from '@adapter/repositories';

export default class GetFacebookUserInfoUseCaseImpl implements GetFacebookUserInfoUseCase {
  invoke = async (pageId: string, userId: string) => chatRepository.getFbUserInfo(pageId, userId);
}
