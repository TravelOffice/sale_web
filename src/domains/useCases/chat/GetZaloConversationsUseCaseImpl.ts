import { GetZaloConversationsUseCase } from '@domain/useCases/interfaces/chat/GetZaloConversationsUseCase';
import { chatRepository } from '@adapter/repositories';

export default class GetZaloConversationsUseCaseImpl implements GetZaloConversationsUseCase {
  invoke = async (pageId: string) => chatRepository.getZaloConversations(pageId)
}
