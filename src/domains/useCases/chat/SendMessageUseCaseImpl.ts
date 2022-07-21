import { chatRepository } from '@adapter/repositories';
import { ChatPlatformSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { Conversation } from '@domain/entities/chat/Conversation';
import { SendMessageUseCase } from '../interfaces/chat/SendMessageUseCase';

export default class SendMessageUseCaseImpl implements SendMessageUseCase {
  invoke = async (message: ChatPlatformSendMessage, conversation: Conversation) => {
    await chatRepository.sendMessage(conversation.chatPlatform, message);
  };
}
