import { GetFacebookConversationsUseCase } from '@domain/useCases/interfaces/chat/GetFacebookConversationsUseCase';
import { chatRepository } from '@adapter/repositories';

class GetFacebookConversationsUseCaseImpl implements GetFacebookConversationsUseCase {
  invoke = async (pageId: string) => chatRepository.getFacebookConversations(pageId)
}

export default GetFacebookConversationsUseCaseImpl;
