import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookMessage } from '@domain/entities/chat/facebook/FacebookMessage';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';
import conversationMapper from '@domain/mappers/ConversationMapper';
import gqlClient from '@graphql/client';
import { sendMessage } from '@graphql/mutations';
import {
  allFbConversations,
  allFbMessages,
  allTelegramConversations,
  allTelegramMessages,
  allZaloConversations,
  allZaloMessages,
  userProfile,
  adminAllFbConversations,
  adminAllTelegramConversations,
  adminAllZaloConversations,
} from '@graphql/queries';
import { onNewMessage } from '@graphql/subscriptions';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { apiProvider, sessionStorageProvider } from '@adapter/infrastructures';
import { DDBTelegramConversation } from '@domain/entities/chat/telegram/DDBTelegramConversation';
import { DDBTelegramMessages } from '@domain/entities/chat/telegram/DDBTelegramMessage';
import { ResponseType } from '@utils/ApiUtils';
import { ChatRepository } from './interfaces/ChatRepository';

export default class ChatRepositoryImpl implements ChatRepository {
  getFacebookConversations = async (fbPageId: string) => {
    const options = { query: allFbConversations, variables: { fbPageId } };
    const result = await gqlClient.query(options);
    const fbConversations = JSON.parse(result.data.allFbConversations.data).data;
    return fbConversations.map((item: any) => conversationMapper.fromFb(item, fbPageId));
  };

  getZaloConversations = async (zaloPageId: string) => {
    const options = { query: allZaloConversations, variables: { zaloPageId } };
    const result = await gqlClient.query(options);
    const zaloConversations = JSON.parse(result.data.allZaloConversations.data).data;
    return zaloConversations.map((item: any) => conversationMapper.fromZalo(item, zaloPageId));
  };

  /**
   * Get Telegram conversations for given bot id via graphql endpoint
   * @param telegramBotId Telegram bot id
   * @returns List of Telegram conversations stored at TO system
   */
  getTelegramConversations = async (telegramBotId: string) => {
    const options = { query: allTelegramConversations, variables: { telegramBotId } };
    const result = await gqlClient.query(options);
    const payload = result.data.allTelegramConversations.data;
    const conversations: DDBTelegramConversation[] = JSON.parse(payload);
    return conversations
      .map((conversation) => conversationMapper.fromTelegram(conversation, telegramBotId));
  };

  getFbMessages = async (
    conversationId: string, fbPageId: string, after?: string,
  ): Promise<[FacebookMessage[], string]> => {
    const options = { query: allFbMessages, variables: { conversationId, fbPageId, after } };
    const result = await gqlClient.query(options);
    const data = JSON.parse(result.data.allFbMessages.data);
    const fbMessages = data.data as FacebookMessage[];
    return [fbMessages, data.paging.cursors.after];
  };

  getZaloMessages = async (conversationId: string, zaloPageId: string) => {
    const options = { query: allZaloMessages, variables: { conversationId, zaloPageId } };
    const result = await gqlClient.query(options);
    return JSON.parse(result.data.allZaloMessages.data).data as ZaloMessage[];
  };

  /**
   * Get Telegram message of given conversation id
   * Support paging by passing limit and next token values to graph endpoint
   * @param conversationId Conversation id
   * @param botId Telegram bot id
   * @param nextToken Next token that data will be queried from
   */
  getTelegramMessages = async (conversationId: string, botId: string, nextToken?: string) => {
    const options = {
      query: allTelegramMessages,
      variables: { conversationId, botId, nextToken },
    };
    const result = await gqlClient.query(options);
    const payload = result.data.allTelegramMessages.data;
    return JSON.parse(payload) as DDBTelegramMessages;
  };

  sendMessage = async (
    platform: ChatPlatform,
    conversationId: string,
    message: ChatPlatformSendMessage,
  ) => {
    const variables = {
      chatPlatform: platform,
      conversationId,
      customerId: message.customerId,
      recipient: message.recipient,
      sender: message.sender,
      messageData: JSON.stringify(message.messageData),
    };
    const options = { mutation: sendMessage, variables };
    await gqlClient.mutate(options);
  };

  subscribeToNewMessage = () => gqlClient.subscribe({ query: onNewMessage });

  /**
   * Get Facebook user profile by id
   * @param chatPlatform the chat platform
   * @param pageId the Facebook page id
   * @param userId the Facebook user who had sent messages to the page
   * @param chatId the id of conversation
   * @return FacebookUserInfo
   */
  getUserInfo = async (
    chatPlatform: ChatPlatform,
    pageId: string,
    userId: string,
    chatId?: string,
  ) => {
    const variables = {
      pageId,
      pageUserId: userId,
      chatPlatform,
      chatId,
    };
    // Use caching to reduce calling to the backend
    const cachedKey = `${chatPlatform}-user-${pageId}-${userId}`;
    const cachedUserInfoInJSON: string = await sessionStorageProvider.getItem(cachedKey);
    if (JSON.parse(cachedUserInfoInJSON)) {
      return JSON.parse(cachedUserInfoInJSON);
    }
    const options = { query: userProfile, variables };
    const result = await gqlClient.query(options);
    const userInfo = JSON.parse(result.data.userProfile.data);
    await sessionStorageProvider.setItem(cachedKey, JSON.stringify(userInfo));
    return userInfo;
  };

  adminGetFacebookConversations = async (fbPageId: string) => {
    const options = { query: adminAllFbConversations, variables: { fbPageId } };
    const result = await gqlClient.query(options);
    const fbConversations = JSON.parse(result.data.adminAllFbConversations.data).data;
    return fbConversations.map((item: any) => conversationMapper.fromFb(item, fbPageId));
  };

  adminGetZaloConversations = async (zaloPageId: string) => {
    const options = { query: adminAllZaloConversations, variables: { zaloPageId } };
    const result = await gqlClient.query(options);
    const zaloConversations = JSON.parse(result.data.adminAllZaloConversations.data).data;
    return zaloConversations.map((item: any) => conversationMapper.fromZalo(item, zaloPageId));
  };

  adminGetTelegramConversations = async (telegramBotId: string) => {
    const options = { query: adminAllTelegramConversations, variables: { telegramBotId } };
    const result = await gqlClient.query(options);
    const payload = result.data.adminAllTelegramConversations.data;
    const conversations: DDBTelegramConversation[] = JSON.parse(payload);
    return conversations
      .map((conversation) => conversationMapper.fromTelegram(conversation, telegramBotId));
  };

  manualAssignChat = async (data: {
    chatPlatform: ChatPlatform,
    pageId: string,
    conversationId: string,
    assignee: string,
  }) => {
    const { assignee } = data;
    const response = await apiProvider.authorizedRequest.post('/admin/assign-chat', data);
    if (response.message !== ResponseType.SUCCESS) {
      throw Error(`Can not assign chat to user ${assignee}`);
    }
  }
}
