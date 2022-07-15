import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { FacebookMessage } from '@domain/entities/chat/facebook/FacebookMessage';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';
import conversationMapper from '@domain/mappers/ConversationMapper';
import gqlClient from '@graphql/client';
import { sendMessage } from '@graphql/mutations';
import {
  allFbConversations, allFbMessages, allZaloConversations, allZaloMessages, userProfile,
} from '@graphql/queries';
import { onNewMessage } from '@graphql/subscriptions';
import { FacebookUserInfo } from '@domain/entities/chat/facebook/FacebookUserInfo';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { sessionStorageProvider } from '@adapter/infrastructures';
import { ChatRepository } from './interfaces/ChatRepository';

export default class ChatRepositoryImpl implements ChatRepository {
  getFacebookConversations = async (fbPageId?: string) => {
    if (!fbPageId) return [];
    const options = { query: allFbConversations, variables: { fbPageId } };
    const result = await gqlClient.query(options);
    const fbConversations = JSON.parse(result.data.allFbConversations.data).data;
    return fbConversations.map((item: any) => conversationMapper.fromFb(item, fbPageId));
  }

  getZaloConversations = async (zaloPageId?: string) => {
    if (!zaloPageId) return [];
    const options = { query: allZaloConversations, variables: { zaloPageId } };
    const result = await gqlClient.query(options);
    const zaloConversations = JSON.parse(result.data.allZaloConversations.data).data;
    return zaloConversations.map((item: any) => conversationMapper.fromZalo(item, zaloPageId));
  }

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
    const options = { query: allZaloMessages, variables: { userId: conversationId, zaloPageId } };
    const result = await gqlClient.query(options);
    return JSON.parse(result.data.allZaloMessages.data).data as ZaloMessage[];
  };

  sendMessage = async (platform: ChatPlatform, message: ChatPlatformSendMessage) => {
    const variables = {
      chatPlatform: platform,
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
   * @param pageId the Facebook page id
   * @param userId the Facebook user who had sent messages to the page
   * @return FacebookUserInfo
   */
  getFbUserInfo = async (pageId: string, userId: string) => {
    const variables = {
      pageId,
      pageUserId: userId,
      platform: 'facebook',
    };
    // Use caching to reduce calling to the backend
    const cachedKey = `fb-user-${pageId}-${userId}`;
    const cachedUserInfoInJSON: string = await sessionStorageProvider.getItem(cachedKey);
    if (cachedUserInfoInJSON) {
      return JSON.parse(cachedUserInfoInJSON);
    }

    const options = { query: userProfile, variables };
    const result = await gqlClient.query(options);
    const userInfo = JSON.parse(result.data.userProfile.data) as FacebookUserInfo;
    await sessionStorageProvider.setItem(cachedKey, JSON.stringify(userInfo));
    return userInfo;
  }
}
