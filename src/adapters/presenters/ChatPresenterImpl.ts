import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import {
  adminGetPlatformConversationsUseCase,
  getMessagesUseCase,
  getPlatformConversationsUseCase,
  getUserInfoUseCase,
  manualAssignChatUseCase,
  sendAttachmentMessageUseCase,
  sendMessageUseCase,
  subscribeNewMessageUseCase,
} from '@domain/useCases';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { ChatPresenter } from './interfaces/ChatPresenter';

export default class ChatPresenterImpl implements ChatPresenter {
  private currentNextToken?: string

  setNextToken(token?: string) {
    this.currentNextToken = token;
  }

  /**
   * Get conversations for given page id with specific chat platform
   * @param platform Chat platform
   * @param platformPageId Page id
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

  sendMessage = async (message: ChatPlatformSendMessage, conversation: Conversation) => {
    await sendMessageUseCase.invoke(message, conversation);
  };

  sendAttachmentMessage = async (
    sender: string, attachment: File, fileType: SendMessageType, conversation: Conversation,
  ) => {
    await sendAttachmentMessageUseCase.invoke(sender, attachment, fileType, conversation);
  }

  subscribeNewMessage = () => subscribeNewMessageUseCase.invoke();

  /**
   * Get all conversations for given page id with specific chat platform
   * @param platform Chat platform
   * @param platformPageId Page id
   * @returns Conversations of given platform owner id
   */
  adminGetPlatformConversations = async (
    platform: ChatPlatform,
    platformPageId: string,
  ) => adminGetPlatformConversationsUseCase.invoke(platform, platformPageId);

  getUserProfile = async (
    chatPlatform: ChatPlatform, pageId: string, userId: string, chatId?: string,
  ) => getUserInfoUseCase.invoke(chatPlatform, pageId, userId, chatId);

  assignChat = async (
    conversation: Conversation,
    newAssignee:string,
  ) => manualAssignChatUseCase.invoke(conversation, newAssignee);
}
