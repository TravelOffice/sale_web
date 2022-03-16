import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import messageMapper from '@domain/mappers/MessageMapper';
import { store } from '@redux/store';
import { GetMessagesUseCase } from '../interfaces/chat/GetMessagesUseCase';

export default class GetMessagesUseCaseImpl implements GetMessagesUseCase {
  invoke = async (conversation: Conversation) : Promise<Message[]> => {
    const { facebookPage, zaloPage } = store.getState().auth;
    if (conversation.type === 'facebook') {
      return this.getFbMessages(facebookPage?.id || '', conversation);
    }
    if (conversation.type === 'zalo') {
      return this.getZaloMessages(zaloPage?.id || '', conversation);
    }
    return [];
  };

  private getFbMessages = async (fbPageId: string, conversation: Conversation) => {
    const fbMessages = await chatRepository.getFbMessages(conversation.id, fbPageId);
    return fbMessages.map((fbMessage) => messageMapper.fromFacebookMessage(fbMessage));
  }

  private getZaloMessages = async (zaloPageId: string, conversation: Conversation) => {
    const zaloMessages = await chatRepository.getZaloMessages(conversation.contact.id, zaloPageId);
    return zaloMessages.map((zaloMessage) => messageMapper.fromZaloMessage(zaloMessage));
  };
}
