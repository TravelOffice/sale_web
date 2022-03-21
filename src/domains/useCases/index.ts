import { GetConversationsUseCase } from './interfaces/chat/GetConversationsUseCase';
import GetConversationsUseCaseImpl from './chat/GetConversationsUseCaseImpl';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import { SendMessageUseCase } from './interfaces/chat/SendMessageUseCase';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import { SubscribeNewMessageUseCase } from './interfaces/chat/SubscribeNewMessageUseCase';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';

interface UseCases {
  // Chat
  getConversationsUseCase: GetConversationsUseCase,
  getMessagesUseCase: GetMessagesUseCase,
  sendMessageUseCase: SendMessageUseCase,
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase
}

const useCases : UseCases = {
  getConversationsUseCase: new GetConversationsUseCaseImpl(),
  getMessagesUseCase: new GetMessagesUseCaseImpl(),
  sendMessageUseCase: new SendMessageUseCaseImpl(),
  subscribeNewMessageUseCase: new SubscribeNewMessageUseCaseImpl(),
};

export const {
  getConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  subscribeNewMessageUseCase,
} = useCases;
