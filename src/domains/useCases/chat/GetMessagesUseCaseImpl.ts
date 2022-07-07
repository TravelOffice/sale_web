import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/Conversation';
import { Message } from '@domain/entities/Message';
import messageMapper from '@domain/mappers/MessageMapper';
import { usePage } from '@hooks/chat';
import { GetMessagesUseCase } from '../interfaces/chat/GetMessagesUseCase';

export default class GetMessagesUseCaseImpl implements GetMessagesUseCase {
  invoke = async (
    conversation: Conversation, nextToken?: string,
  ) : Promise<[Message[], string]> => {
    const facebookPage = usePage('facebook');
    const zaloPage = usePage('zalo');
    if (conversation.chatPlatform === 'facebook') {
      return this.getFbMessages(facebookPage?.id || '', conversation, nextToken);
    }
    if (conversation.chatPlatform === 'zalo') {
      return this.getZaloMessages(zaloPage?.id || '', conversation);
    }
    return [[], ''];
  };

  private getFbMessages = async (
    fbPageId: string, conversation: Conversation, after?: string,
  ) : Promise<[Message[], string]> => {
    const [fbMessages, fbNextToken] = await chatRepository.getFbMessages(
      conversation.id, fbPageId, after,
    );
    const messages = fbMessages.map((fbMessage) => messageMapper.fromFacebookMessage(fbMessage));
    return [messages, fbNextToken];
  }

  private getZaloMessages = async (
    zaloPageId: string, conversation: Conversation, offset: number = 0,
  ) : Promise<[Message[], string]> => {
    const zaloMessages = await chatRepository.getZaloMessages(conversation.contact.id, zaloPageId);
    const messages = zaloMessages.map((zaloMessage) => messageMapper.fromZaloMessage(zaloMessage));
    return [messages, `${offset}`];
  };
}
