import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { FacebookPage } from '@domain/entities/FacebookPage';
import { facebookRepository } from '@adapter/repositories';

export default class GetFacebookPagesUseCaseImpl implements GetFacebookPagesUseCase {
  invoke = async (
    userAccessToken: string,
  ): Promise<FacebookPage[]> => facebookRepository.getPages(userAccessToken);
}
