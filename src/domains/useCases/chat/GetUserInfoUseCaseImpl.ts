import { GetUserInfoUseCase } from '@domain/useCases/interfaces/chat/GetUserInfoUseCase';
import { chatRepository } from '@adapter/repositories';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

/* eslint-disable max-len */
export default class GetUserInfoUseCaseImpl implements GetUserInfoUseCase {
  invoke = async (chatPlatform: ChatPlatform, pageId: string, userId: string, chatId?: string) => chatRepository.getUserInfo(chatPlatform, pageId, userId, chatId);
}
