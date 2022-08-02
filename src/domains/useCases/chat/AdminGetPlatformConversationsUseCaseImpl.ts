import { chatRepository } from '@adapter/repositories';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { AdminGetPlatformConversationsUseCase } from '../interfaces/chat/AdminGetPlatformConversationsUseCase';

class AdminGetPlatformConversationsUseCaseImpl implements AdminGetPlatformConversationsUseCase {
  invoke = async (platform: ChatPlatform, platformPageId: string) => {
    switch (platform) {
      case 'facebook':
        return chatRepository.adminGetFacebookConversations(platformPageId);
      case 'zalo':
        return chatRepository.adminGetZaloConversations(platformPageId);
      case 'telegram':
        return chatRepository.adminGetTelegramConversations(platformPageId);

      default:
        throw new Error(`Chat platform ${platform} is not supported yet.`);
    }
  };
}

export default AdminGetPlatformConversationsUseCaseImpl;
