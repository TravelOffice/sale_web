import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { FacebookMessage } from '@domain/entities/FacebookMessage';
import { Message } from '@domain/entities/Message';
import { ZaloMessage } from '@domain/entities/ZaloMessage';
import conversationMapper from '@domain/mappers/ConversationMapper';
import gqlClient from '@graphql/client';
import { sendMessage } from '@graphql/mutations';
import {
  allConversations, allFbMessages, allZaloMessages, userProfile,
} from '@graphql/queries';
import { onNewMessage } from '@graphql/subscriptions';
import { FacebookUserInfo } from '@domain/entities/FacebookUserInfo';
import { ChatRepository } from './interfaces/ChatRepository';

export default class ChatRepositoryImpl implements ChatRepository {
  getConversations = async (fbPageId: string, zaloPageId: string) => {
    const options = { query: allConversations, variables: { fbPageId, zaloPageId } };
    const result = await gqlClient.query(options);
    const { allFbConversations, allZaloConversations } = result.data;
    const fbConversations = JSON.parse(allFbConversations.data).data;
    const zaloConversations = JSON.parse(allZaloConversations.data).data;
    return [
      ...fbConversations.map((item: any) => conversationMapper.fromFb(item, fbPageId)),
      ...zaloConversations.map((item: any) => conversationMapper.fromZalo(item, zaloPageId)),
    ];
  };

  getFbMessages = async (
    conversationId: string, fbPageId: string, after?: string,
  ) : Promise<[FacebookMessage[], string]> => {
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

  sendMessage = async (platform: ChatPlatform, message: Message) => {
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
    const options = { query: userProfile, variables };
    const result = await gqlClient.query(options);
    return JSON.parse(result.data.userProfile.data) as FacebookUserInfo;
  }
}
