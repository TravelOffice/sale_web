import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { FacebookMessage } from '@domain/entities/FacebookMessage';
import { Message } from '@domain/entities/Message';
import { ZaloMessage } from '@domain/entities/ZaloMessage';
import conversationMapper from '@domain/mappers/ConversationMapper';
import gqlClient from '@graphql/client';
import { sendMessage } from '@graphql/mutations';
import { allConversations, allFbMessages, allZaloMessages } from '@graphql/queries';
import { onNewMessage } from '@graphql/subscriptions';
import { ChatRepository } from './interfaces/ChatRepository';

export default class ChatRepositoryImpl implements ChatRepository {
  getConversations = async (fbPageId: string, zaloPageId: string) => {
    const options = { query: allConversations, variables: { fbPageId, zaloPageId } };
    const result = await gqlClient.query(options);
    const { allFbConversations, allZaloConversations } = result.data;
    const fbConversations = JSON.parse(allFbConversations.data).data;
    const zaloConversations = JSON.parse(allZaloConversations.data).data;
    const conversations = [
      ...fbConversations.map((item: any) => conversationMapper.fromFb(item, fbPageId)),
      ...zaloConversations.map((item: any) => conversationMapper.fromZalo(item, zaloPageId)),
    ];
    return conversations;
  };

  getFbMessages = async (conversationId: string, fbPageId: string) => {
    const options = { query: allFbMessages, variables: { conversationId, fbPageId } };
    const result = await gqlClient.query(options);
    return JSON.parse(result.data.allFbMessages.data).data as FacebookMessage[];
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
}
