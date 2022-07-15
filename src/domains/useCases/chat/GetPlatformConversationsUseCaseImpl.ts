import { chatRepository } from '@adapter/repositories';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { GetPlatformConversationsUseCase } from '../interfaces/chat/GetPlatformConversationsUseCase';

class GetPlatformConversationsUseCaseImpl implements GetPlatformConversationsUseCase {
  invoke = async (platform: ChatPlatform, platformPageId: string) => {
    switch (platform) {
      case 'facebook':
        return chatRepository.getFacebookConversations(platformPageId);
      case 'zalo':
        return chatRepository.getZaloConversations(platformPageId);
      case 'telegram':
        return chatRepository.getTelegramConversations(platformPageId);

      default:
        throw new Error(`Chat platform ${platform} is not supported yet.`);
    }
  };
}

export default GetPlatformConversationsUseCaseImpl;
