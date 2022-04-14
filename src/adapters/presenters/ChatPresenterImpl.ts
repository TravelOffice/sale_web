import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import {
  getConversationsUseCase,
  getMessagesUseCase,
  sendAttachmentMessageUseCase,
  sendMessageUseCase,
  subscribeNewMessageUseCase,
} from '@domain/useCases';
import { ChatPresenter } from './interfaces/ChatPresenter';

export default class ChatPresenterImpl implements ChatPresenter {
  private currentNextToken?: string

  setNextToken(token: string) {
    this.currentNextToken = token;
  }

  getConversations = async () => getConversationsUseCase.invoke();

  getMessages = async (conversation: Conversation): Promise<Message[]> => {
    const result = await getMessagesUseCase.invoke(conversation);
    this.setNextToken(result[1]);
    return result[0];
  };

  loadMoreMessage = async (conversation: Conversation): Promise<Message[]> => {
    const result = await getMessagesUseCase.invoke(conversation, this.currentNextToken);
    this.setNextToken(result[1]);
    return result[0];
  }

  sendMessage = async (message: Message, conversation: Conversation) => {
    await sendMessageUseCase.invoke(message, conversation);
  };

  sendAttachmentMessage = async (sender: string, attachment: File, conversation: Conversation) => {
    await sendAttachmentMessageUseCase.invoke(sender, attachment, conversation);
  }

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();
}
