import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import {
  getConversationsUseCase, getMessagesUseCase, sendMessageUseCase, subscribeNewMessageUseCase,
} from '@domain/useCases';
import { ChatPresenter } from './interfaces/ChatPresenter';

export default class ChatPresenterImpl implements ChatPresenter {
  private currentNextToken?: string

  setNextToken(token: string) {
    this.currentNextToken = token;
  }

  getConversations = async () => getConversationsUseCase.invoke();

  getMessages = async (conversation?: Conversation) : Promise<Message[]> => {
    if (!conversation) return [];
    const result = await getMessagesUseCase.invoke(conversation);
    this.setNextToken(result[1]);
    return result[0];
  };

  loadMoreMessage = async (conversation?: Conversation) : Promise<Message[]> => {
    if (!conversation) return [];
    const result = await getMessagesUseCase.invoke(conversation, this.currentNextToken);
    this.setNextToken(result[1]);
    return result[0];
  }

  sendMessage = async (message: Message, conversation?: Conversation) => {
    if (!conversation) return;
    await sendMessageUseCase.invoke(message, conversation);
  };

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();
}
