import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/Conversation';
import { store } from '@redux/store';
import { GetConversationsUseCase } from '../interfaces/chat/GetConversationsUseCase';

export default class GetConversationsUseCaseImpl implements GetConversationsUseCase {
  invoke = async () : Promise<Conversation[]> => {
    const { facebookPage, zaloPage } = store.getState().auth;
    const fbPageId = facebookPage?.id || '';
    const zaloPageId = zaloPage?.id || '';
    return chatRepository.getConversations(fbPageId, zaloPageId);
  };
}
