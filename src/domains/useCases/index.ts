import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
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
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase,
  getFacebookPagesUseCase: GetFacebookPagesUseCase,
}

const useCases : UseCases = {
  getConversationsUseCase: new GetConversationsUseCaseImpl(),
  getMessagesUseCase: new GetMessagesUseCaseImpl(),
  sendMessageUseCase: new SendMessageUseCaseImpl(),
  subscribeNewMessageUseCase: new SubscribeNewMessageUseCaseImpl(),
  getFacebookPagesUseCase: new GetFacebookPagesUseCaseImpl(),
};

// eslint-disable-next-line import/prefer-default-export
export const {
  getConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  subscribeNewMessageUseCase,
  getFacebookPagesUseCase,
} = useCases;
