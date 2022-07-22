import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import {
  getFacebookUserInfoUseCase,
  getMessagesUseCase,
  getPlatformConversationsUseCase,
  sendAttachmentMessageUseCase,
  sendMessageUseCase,
  subscribeNewMessageUseCase,
} from '@domain/useCases';
import { ChatPresenter } from './interfaces/ChatPresenter';

export default class ChatPresenterImpl implements ChatPresenter {
  private currentNextToken?: string

  setNextToken(token?: string) {
    this.currentNextToken = token;
  }

  /**
   * Get conversations for given page id with specific chat platform
   * @param platformOwnerId Platform page id or Telegram channel id
   * @returns Conversations of given platform owner id
   */
  getPlatformConversations = async (
    platform: ChatPlatform,
    platformPageId: string,
  ) => getPlatformConversationsUseCase.invoke(platform, platformPageId);

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
    sender: string, attachment: File, fileType: SendMessageType, conversation: Conversation,
  ) => {
    await sendAttachmentMessageUseCase.invoke(sender, attachment, fileType, conversation);
  }

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();

  getFbUserProfile = async (
    pageId: string, userId: string,
  ) => getFacebookUserInfoUseCase.invoke(pageId, userId);
}
