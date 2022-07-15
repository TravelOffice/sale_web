import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/chat/Conversation';
import { Message } from '@domain/entities/chat/Message';
import { SendMessageUseCase } from '../interfaces/chat/SendMessageUseCase';

export default class SendMessageUseCaseImpl implements SendMessageUseCase {
  invoke = async (message: Message, conversation: Conversation) => {
    await chatRepository.sendMessage(conversation.chatPlatform, message);
  };
}
