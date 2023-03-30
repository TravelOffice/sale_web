import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import { DDBZaloMessage } from '@domain/entities/chat/zalo/DDBZaloMessage';
import messageMapper from '@domain/mappers/MessageMapper';
import { getPageFromRedux } from '@utils/ChatUtils';
import { GetMessagesUseCase } from '../interfaces/chat/GetMessagesUseCase';

export default class GetMessagesUseCaseImpl implements GetMessagesUseCase {
  invoke = async (
    conversation: Conversation, nextToken?: string,
  ): Promise<[Message[], string?]> => {
    // Page can be Facebook / Zalo page or Telegram bot
    const page = getPageFromRedux(conversation.chatPlatform);
    if (!page) {
      throw new Error(`Platform page ${conversation.chatPlatform} is not linked to system yet.`);
    }
    // Get message for specific platform
    switch (conversation.chatPlatform) {
      case 'facebook':
        return this.getFbMessages(page.id, conversation, nextToken);

      case 'zalo':
        return this.getZaloMessages(page.id, conversation, nextToken);

      case 'telegram':
        return this.getTelegramMessages(page.id, conversation, nextToken);

      default: throw new Error(`Chat platform ${conversation.chatPlatform} is not supported.`);
    }
  };

  private getFbMessages = async (
    fbPageId: string, conversation: Conversation, nextToken?: string,
  ): Promise<[Message[], string]> => {
    const [fbMessages, fbNextToken] = await chatRepository.getFbMessages(
      conversation.id, fbPageId, nextToken,
    );
    const messages = fbMessages.map(
      (fbMessage) => messageMapper.fromFacebookMessage(fbMessage.content),
    );
    return [messages, fbNextToken];
  };

  private getZaloMessages = async (
    zaloPageId: string,
    conversation: Conversation,
    nextToken?: string,
  ): Promise<[Message[], string]> => {
    const [ddbZaloMessages, zaloNextToken] = await chatRepository.getZaloMessages(
      conversation.contact.id, zaloPageId, nextToken,
    );
    const messages = ddbZaloMessages.map(
      (ddbZaloMessage: DDBZaloMessage) => messageMapper.fromZaloMessage(ddbZaloMessage.content),
    );
    return [messages, `${zaloNextToken}`];
  };

  private getTelegramMessages = async (
    botId: string,
    conversation: Conversation,
    nextToken?: string,
  ): Promise<[Message[], string?]> => {
    const {
      messages: ddbTelegramMessages,
      nextToken: incomingNextToken,
    } = await chatRepository.getTelegramMessages(
      conversation.id,
      botId,
      nextToken,
    );
    const messages = ddbTelegramMessages
      .map((message) => messageMapper.fromTelegramMessage(message, botId));
    return [messages, incomingNextToken];
  };
}
