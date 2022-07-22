import { chatRepository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/chat/Conversation';
import {
  ChatPlatformSendMessage,
} from '@domain/entities/chat/ChatPlatformSendMessage';
import { SendMessageUseCase } from '../interfaces/chat/SendMessageUseCase';

/**
 * Use case to send new text message from page to the customer
 */
export default class SendMessageUseCaseImpl implements SendMessageUseCase {
  invoke = async (message: ChatPlatformSendMessage, conversation: Conversation) => {
    await chatRepository.sendMessage(conversation.chatPlatform, message);
  };
}
