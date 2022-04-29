import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { ConnectFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectFacebookPageUseCase';
import ConnectFacebookPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectFacebookPageUseCaseImpl';
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
import { AddLeadUseCase } from './interfaces/lead/AddLeadUseCase';
import AddLeadUseCaseImpl from './lead/AddLeadUseCaseImpl';
import UpdateLeadUseCaseImpl from './lead/UpdateLeadUseCaseImpl';
import { UpdateLeadUseCase } from './interfaces/lead/UpdateLeadUseCase';
import GetAllOpportunitiesUseCaseImpl from './opportunity/GetAllOpportunitiesUseCaseImpl';
import { GetAllOpportunitiesUseCase } from './interfaces/opportunity/GetAllOpportunitiesUseCase';

interface UseCases {
  // Chat
  getConversationsUseCase: GetConversationsUseCase,
  getMessagesUseCase: GetMessagesUseCase,
  sendMessageUseCase: SendMessageUseCase,
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase,
  getFacebookPagesUseCase: GetFacebookPagesUseCase,
  sendAttachmentMessageUseCase: SendAttachmentMessageUseCase,
  getAllLeadsUseCase: GetAllLeadsUseCase
  addLeadUseCase: AddLeadUseCase
  updateLeadUseCase: UpdateLeadUseCase
  connectFacebookPageUseCase: ConnectFacebookPageUseCase,
  getAllOpportunitiesUseCase: GetAllOpportunitiesUseCase,
}

const useCases : UseCases = {
  getConversationsUseCase: new GetConversationsUseCaseImpl(),
  getMessagesUseCase: new GetMessagesUseCaseImpl(),
  sendMessageUseCase: new SendMessageUseCaseImpl(),
  sendAttachmentMessageUseCase: new SendAttachmentMessageUseCaseImpl(),
  subscribeNewMessageUseCase: new SubscribeNewMessageUseCaseImpl(),
  getFacebookPagesUseCase: new GetFacebookPagesUseCaseImpl(),
  getAllLeadsUseCase: new GetAllLeadsUseCaseImpl(),
  addLeadUseCase: new AddLeadUseCaseImpl(),
  updateLeadUseCase: new UpdateLeadUseCaseImpl(),
  connectFacebookPageUseCase: new ConnectFacebookPageUseCaseImpl(),
  getAllOpportunitiesUseCase: new GetAllOpportunitiesUseCaseImpl(),
};

export const {
  getConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  sendAttachmentMessageUseCase,
  subscribeNewMessageUseCase,
  getFacebookPagesUseCase,
  getAllLeadsUseCase,
  addLeadUseCase,
  updateLeadUseCase,
  connectFacebookPageUseCase,
  getAllOpportunitiesUseCase,
} = useCases;
