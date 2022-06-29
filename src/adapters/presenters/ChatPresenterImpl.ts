import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import {
  getFacebookConversationsUseCase,
  getFacebookUserInfoUseCase,
  getMessagesUseCase,
  getZaloConversationsUseCase,
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

  getFbConversations = async (pageId: string) => getFacebookConversationsUseCase.invoke(pageId);

  getZaloConversations = async (pageId: string) => getZaloConversationsUseCase.invoke(pageId);

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

  sendAttachmentMessage = async (
    sender: string, attachment: File, fileType: AttachmentMessageType, conversation: Conversation,
  ) => {
    await sendAttachmentMessageUseCase.invoke(sender, attachment, fileType, conversation);
  }

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();

  getFbUserProfile = async (
    pageId: string, userId: string,
  ) => getFacebookUserInfoUseCase.invoke(pageId, userId);
}
