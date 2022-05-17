import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { ConnectFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectFacebookPageUseCase';
import { ConnectZaloPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectZaloPageUseCase';
import { GetZaloOAuthLinkUseCase } from '@domain/useCases/interfaces/zalo/GetZaloOAuthLinkUseCase';
import ConnectFacebookPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectFacebookPageUseCaseImpl';
import ConnectZaloPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectZaloPageUseCaseImpl';
import GetZaloOAuthLinkUseCaseImpl from '@domain/useCases/zalo/GetZaloOAuthLinkUseCaseImpl';
import GetConversationsUseCaseImpl from './chat/GetConversationsUseCaseImpl';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import SendAttachmentMessageUseCaseImpl from './chat/SendAttachmentMessageUseCaseImpl';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';
import AddCustomerUseCaseImpl from './customer/AddCustomerUseCaseImpl';
import GetAllCustomersUseCaseImpl from './customer/GetAllCustomersUseCaseImpl';
import UpdateCustomerUseCaseImpl from './customer/UpdateCustomerUseCaseImpl';
import { GetConversationsUseCase } from './interfaces/chat/GetConversationsUseCase';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import { SendAttachmentMessageUseCase } from './interfaces/chat/SendAttachmentMessageUseCase';
import { SendMessageUseCase } from './interfaces/chat/SendMessageUseCase';
import { SubscribeNewMessageUseCase } from './interfaces/chat/SubscribeNewMessageUseCase';
import { AddCustomerUseCase } from './interfaces/customer/AddCustomerUseCase';
import { GetAllCustomersUseCase } from './interfaces/customer/GetAllCustomersUseCase';
import { UpdateCustomerUseCase } from './interfaces/customer/UpdateCustomerUseCase';
import { AddLeadUseCase } from './interfaces/lead/AddLeadUseCase';
import { GetAllLeadsUseCase } from './interfaces/lead/GetAllLeadsUseCase';
import { UpdateLeadUseCase } from './interfaces/lead/UpdateLeadUseCase';
import { GetAllOpportunitiesUseCase } from './interfaces/opportunity/GetAllOpportunitiesUseCase';
import { GetOpportunitiesByLeadUseCase } from './interfaces/opportunity/GetOpportunitiesByLeadUseCase';
import AddLeadUseCaseImpl from './lead/AddLeadUseCaseImpl';
import GetAllLeadsUseCaseImpl from './lead/GetAllLeadsUseCaseImpl';
import UpdateLeadUseCaseImpl from './lead/UpdateLeadUseCaseImpl';
import GetAllOpportunitiesUseCaseImpl from './opportunity/GetAllOpportunitiesUseCaseImpl';
import GetOpportunitiesByLeadUseCaseImpl from './opportunity/GetOpportunitiesByLeadUseCaseImpl';

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
  getOpportunitiesByLeadUseCase: GetOpportunitiesByLeadUseCase,
  getAllCustomersUseCase: GetAllCustomersUseCase,
  addCustomerUseCase: AddCustomerUseCase,
  updateCustomerUseCase: UpdateCustomerUseCase,
  // Zalo page
  getZaloOAuthLinkUseCase: GetZaloOAuthLinkUseCase,
  connectZaloPageUseCase: ConnectZaloPageUseCase,
}

const useCases: UseCases = {
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
  getOpportunitiesByLeadUseCase: new GetOpportunitiesByLeadUseCaseImpl(),
  getAllCustomersUseCase: new GetAllCustomersUseCaseImpl(),
  addCustomerUseCase: new AddCustomerUseCaseImpl(),
  updateCustomerUseCase: new UpdateCustomerUseCaseImpl(),
  getZaloOAuthLinkUseCase: new GetZaloOAuthLinkUseCaseImpl(),
  connectZaloPageUseCase: new ConnectZaloPageUseCaseImpl(),
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
  getOpportunitiesByLeadUseCase,
  getAllCustomersUseCase,
  addCustomerUseCase,
  updateCustomerUseCase,
  getZaloOAuthLinkUseCase,
  connectZaloPageUseCase,
} = useCases;
