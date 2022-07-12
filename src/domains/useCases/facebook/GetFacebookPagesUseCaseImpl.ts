import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { facebookRepository } from '@adapter/repositories';

export default class GetFacebookPagesUseCaseImpl implements GetFacebookPagesUseCase {
  invoke = async (
    userAccessToken: string,
  ): Promise<FacebookPageProfile[]> => facebookRepository.getPages(userAccessToken);
}
