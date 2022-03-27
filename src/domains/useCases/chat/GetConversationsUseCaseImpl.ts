import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/Conversation';
import { store } from '@redux/store';
import { GetConversationsUseCase } from '../interfaces/chat/GetConversationsUseCase';

export default class GetConversationsUseCaseImpl implements GetConversationsUseCase {
  invoke = async () : Promise<Conversation[]> => {
    const { facebookPage, zaloPage } = store.getState().auth;
    const fbPageId = facebookPage?.id || '';
    const zaloPageId = zaloPage?.id || '';
    const conversations = await chatRepository.getConversations(fbPageId, zaloPageId);
    const fbConversations = conversations.filter((item) => item.chatPlatform === 'facebook');
    const userProfiles = await Promise.all(
      fbConversations.map(
        async (fbConversation) => chatRepository.getFbUserInfo(fbPageId, fbConversation.contact.id),
      ),
    );
    userProfiles.forEach((profile) => {
      const conversation = fbConversations.find(
        (fbConversation) => fbConversation.contact.id === profile.id,
      );
      if (conversation) {
        conversation.contact.avatar = profile.profile_pic;
      }
    });
    return conversations;
  };
}
