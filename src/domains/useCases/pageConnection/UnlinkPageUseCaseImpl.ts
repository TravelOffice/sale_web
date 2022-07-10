import { pageConnectionRepository } from '@adapter/repositories';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { UnlinkPageUseCase } from '../interfaces/pageConnection/UnlinkPageUseCase';

export default class UnlinkPageUseCaseImpl implements UnlinkPageUseCase {
  invoke = async (
    platform: ChatPlatform, pageId: string,
  ) => pageConnectionRepository.unlinkPage(platform, pageId);
}
