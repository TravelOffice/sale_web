import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { GetConversationsUseCase } from './interfaces/chat/GetConversationsUseCase';
import GetConversationsUseCaseImpl from './chat/GetConversationsUseCaseImpl';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import { SendMessageUseCase } from './interfaces/chat/SendMessageUseCase';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import { SendAttachmentMessageUseCase } from './interfaces/chat/SendAttachmentMessageUseCase';
import SendAttachmentMessageUseCaseImpl from './chat/SendAttachmentMessageUseCaseImpl';
import { SubscribeNewMessageUseCase } from './interfaces/chat/SubscribeNewMessageUseCase';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';
import { GetAllLeadsUseCase } from './interfaces/lead/GetAllLeadsUseCase';
import GetAllLeadsUseCaseImpl from './lead/GetAllLeadsUseCaseImpl';

interface UseCases {
  // Chat
  getConversationsUseCase: GetConversationsUseCase,
  getMessagesUseCase: GetMessagesUseCase,
  sendMessageUseCase: SendMessageUseCase,
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase,
  getFacebookPagesUseCase: GetFacebookPagesUseCase,
  sendAttachmentMessageUseCase: SendAttachmentMessageUseCase,
  getAllLeadsUseCase: GetAllLeadsUseCase
}

const useCases : UseCases = {
  getConversationsUseCase: new GetConversationsUseCaseImpl(),
  getMessagesUseCase: new GetMessagesUseCaseImpl(),
  sendMessageUseCase: new SendMessageUseCaseImpl(),
  sendAttachmentMessageUseCase: new SendAttachmentMessageUseCaseImpl(),
  subscribeNewMessageUseCase: new SubscribeNewMessageUseCaseImpl(),
  getFacebookPagesUseCase: new GetFacebookPagesUseCaseImpl(),
  getAllLeadsUseCase: new GetAllLeadsUseCaseImpl(),
};

// eslint-disable-next-line import/prefer-default-export
export const {
  getConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  sendAttachmentMessageUseCase,
  subscribeNewMessageUseCase,
  getFacebookPagesUseCase,
  getAllLeadsUseCase,
} = useCases;
