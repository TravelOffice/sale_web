import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import {
  getConversationsUseCase, getMessagesUseCase, sendMessageUseCase, subscribeNewMessageUseCase,
} from '@domain/useCases';
import { ChatPresenter } from './interfaces/ChatPresenter';

export default class ChatPresenterImpl implements ChatPresenter {
  getConversations = async () => getConversationsUseCase.invoke();

  getMessages = async (conversation?: Conversation) => {
    if (!conversation) return [];
    return getMessagesUseCase.invoke(conversation);
  };

  sendMessage = async (message: Message, conversation?: Conversation) => {
    if (!conversation) return;
    await sendMessageUseCase.invoke(message, conversation);
  };

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();
}
