import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { CreateOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/CreateOpportunityUseCase';
import { ConnectFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectFacebookPageUseCase';
import { ConnectZaloPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectZaloPageUseCase';
import { GetZaloOAuthLinkUseCase } from '@domain/useCases/interfaces/zalo/GetZaloOAuthLinkUseCase';
import CreateOpportunityUseCaseImpl from '@domain/useCases/opportunity/CreateOpportunityUseCaseImpl';
import ConnectFacebookPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectFacebookPageUseCaseImpl';
import ConnectZaloPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectZaloPageUseCaseImpl';
import GetZaloOAuthLinkUseCaseImpl from '@domain/useCases/zalo/GetZaloOAuthLinkUseCaseImpl';
import GetOpportunityUseCaseImpl from '@domain/useCases/opportunity/GetOpportunityUseCaseImpl';
import { GetOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/GetOpportunityUseCase';
import { GetCurrentUserUseCase } from '@domain/useCases/interfaces/user/GetCurrentUserUseCase';
import { GetAllUsersUseCase } from '@domain/useCases/interfaces/user/GetAllUsersUseCase';
import { GetUserInfoUseCase } from '@domain/useCases/interfaces/chat/GetUserInfoUseCase';
import GetUserInfoUseCaseImpl from '@domain/useCases/chat/GetUserInfoUseCaseImpl';
import { GetNotificationsUseCase } from '@domain/useCases/interfaces/notification/GetNotificationsUseCase';
import { SaveNotificationUseCase } from '@domain/useCases/interfaces/notification/SaveNotificationUseCase';
import GetNotificationsUseCaseImpl from '@domain/useCases/notification/GetNotificationsUseCaseImpl';
import SaveNotificationUseCaseImpl from '@domain/useCases/notification/SaveNotificationUseCaseImpl';
import { ConnectTelegramPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectTelegramPageUseCase';
import ConnectTelegramPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectTelegramPageUseCaseImpl';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import SendAttachmentMessageUseCaseImpl from './chat/SendAttachmentMessageUseCaseImpl';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';
import AddCustomerUseCaseImpl from './customer/AddCustomerUseCaseImpl';
import GetAllCustomersUseCaseImpl from './customer/GetAllCustomersUseCaseImpl';
import UpdateCustomerUseCaseImpl from './customer/UpdateCustomerUseCaseImpl';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import { SendAttachmentMessageUseCase } from './interfaces/chat/SendAttachmentMessageUseCase';
import { SendMessageUseCase } from './interfaces/chat/SendMessageUseCase';
import { SubscribeNewMessageUseCase } from './interfaces/chat/SubscribeNewMessageUseCase';
import { AddCustomerUseCase } from './interfaces/customer/AddCustomerUseCase';
import { GetAllCustomersUseCase } from './interfaces/customer/GetAllCustomersUseCase';
import { UpdateCustomerUseCase } from './interfaces/customer/UpdateCustomerUseCase';
import { AddLeadUseCase } from './interfaces/lead/AddLeadUseCase';
import { GetAllLeadsUseCase } from './interfaces/lead/GetAllLeadsUseCase';
import { GetLeadUseCase } from './interfaces/lead/GetLeadUseCase';
import { UpdateLeadUseCase } from './interfaces/lead/UpdateLeadUseCase';
import { DeleteOpportunityUseCase } from './interfaces/opportunity/DeleteOpportunityUseCase';
import { GetAllOpportunitiesUseCase } from './interfaces/opportunity/GetAllOpportunitiesUseCase';
import { GetOpportunitiesByLeadUseCase } from './interfaces/opportunity/GetOpportunitiesByLeadUseCase';
import { UpdateOpportunityUseCase } from './interfaces/opportunity/UpdateOpportunityUseCase';
import AddLeadUseCaseImpl from './lead/AddLeadUseCaseImpl';
import GetAllLeadsUseCaseImpl from './lead/GetAllLeadsUseCaseImpl';
import GetLeadUseCaseImpl from './lead/GetLeadUseCaseImpl';
import UpdateLeadUseCaseImpl from './lead/UpdateLeadUseCaseImpl';
import DeleteOpportunityUseCaseImpl from './opportunity/DeleteOpportunityUseCaseImpl';
import GetAllOpportunitiesUseCaseImpl from './opportunity/GetAllOpportunitiesUseCaseImpl';
import GetOpportunitiesByLeadUseCaseImpl from './opportunity/GetOpportunitiesByLeadUseCaseImpl';
import UpdateOpportunityUseCaseImpl from './opportunity/UpdateOpportunityUseCaseImpl';
import GetCurrentUserUseCaseImpl from './user/GetCurrentUserUseCaseImpl';
import GetAllUsersUseCaseImpl from './user/GetAllUsersUseCaseImpl';
import { GetLinkedPagesUseCase } from './interfaces/pageConnection/GetLinkedPagesUseCase';
import GetLinkedPagesUseCaseImpl from './pageConnection/GetLinkedPagesUseCaseImpl';
import { UnlinkPageUseCase } from './interfaces/pageConnection/UnlinkPageUseCase';
import UnlinkPageUseCaseImpl from './pageConnection/UnlinkPageUseCaseImpl';
import { GetPlatformConversationsUseCase } from './interfaces/chat/GetPlatformConversationsUseCase';
import GetPlatformConversationsUseCaseImpl from './chat/GetPlatformConversationsUseCaseImpl';
import { AdminGetPlatformConversationsUseCase } from './interfaces/chat/AdminGetPlatformConversationsUseCase';
import AdminGetPlatformConversationsUseCaseImpl from './chat/AdminGetPlatformConversationsUseCaseImpl';

interface UseCases {
  // Chat
  getPlatformConversationsUseCase: GetPlatformConversationsUseCase,
  getMessagesUseCase: GetMessagesUseCase,
  sendMessageUseCase: SendMessageUseCase,
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase,
  getFacebookPagesUseCase: GetFacebookPagesUseCase,
  sendAttachmentMessageUseCase: SendAttachmentMessageUseCase,
  getAllLeadsUseCase: GetAllLeadsUseCase
  getLeadUseCase: GetLeadUseCase
  addLeadUseCase: AddLeadUseCase
  updateLeadUseCase: UpdateLeadUseCase
  connectFacebookPageUseCase: ConnectFacebookPageUseCase,
  getUserInfoUseCase: GetUserInfoUseCase,
  getLinkedPagesUseCase: GetLinkedPagesUseCase,
  unlinkPageUseCase: UnlinkPageUseCase,
  adminGetPlatformConversationsUseCase: AdminGetPlatformConversationsUseCase,
  // Opportunity
  getAllOpportunitiesUseCase: GetAllOpportunitiesUseCase,
  getOpportunitiesByLeadUseCase: GetOpportunitiesByLeadUseCase,
  deleteOpportunityUseCase: DeleteOpportunityUseCase,
  createOpportunityUseCase: CreateOpportunityUseCase,
  updateOpportunityUseCase: UpdateOpportunityUseCase,
  getOpportunityUseCase: GetOpportunityUseCase,
  // Customer
  getAllCustomersUseCase: GetAllCustomersUseCase,
  addCustomerUseCase: AddCustomerUseCase,
  updateCustomerUseCase: UpdateCustomerUseCase,
  // Zalo page
  getZaloOAuthLinkUseCase: GetZaloOAuthLinkUseCase,
  connectZaloPageUseCase: ConnectZaloPageUseCase,
  // Telegram
  connectTelegramPageUseCase: ConnectTelegramPageUseCase,
  // User
  getCurrentUserUseCase: GetCurrentUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase,
  // Notification
  getNotificationsUseCase: GetNotificationsUseCase,
  saveNotificationUseCase: SaveNotificationUseCase,
}

const useCases: UseCases = {
  // Chat platform use cases
  getZaloOAuthLinkUseCase: new GetZaloOAuthLinkUseCaseImpl(),
  connectZaloPageUseCase: new ConnectZaloPageUseCaseImpl(),
  connectFacebookPageUseCase: new ConnectFacebookPageUseCaseImpl(),
  connectTelegramPageUseCase: new ConnectTelegramPageUseCaseImpl(),
  getMessagesUseCase: new GetMessagesUseCaseImpl(),
  sendMessageUseCase: new SendMessageUseCaseImpl(),
  sendAttachmentMessageUseCase: new SendAttachmentMessageUseCaseImpl(),
  subscribeNewMessageUseCase: new SubscribeNewMessageUseCaseImpl(),
  getFacebookPagesUseCase: new GetFacebookPagesUseCaseImpl(),
  getPlatformConversationsUseCase: new GetPlatformConversationsUseCaseImpl(),
  getUserInfoUseCase: new GetUserInfoUseCaseImpl(),
  getLinkedPagesUseCase: new GetLinkedPagesUseCaseImpl(),
  unlinkPageUseCase: new UnlinkPageUseCaseImpl(),
  adminGetPlatformConversationsUseCase: new AdminGetPlatformConversationsUseCaseImpl(),
  // Lead use cases
  getAllLeadsUseCase: new GetAllLeadsUseCaseImpl(),
  getLeadUseCase: new GetLeadUseCaseImpl(),
  addLeadUseCase: new AddLeadUseCaseImpl(),
  updateLeadUseCase: new UpdateLeadUseCaseImpl(),
  // Opportunity use cases
  getAllOpportunitiesUseCase: new GetAllOpportunitiesUseCaseImpl(),
  getOpportunitiesByLeadUseCase: new GetOpportunitiesByLeadUseCaseImpl(),
  deleteOpportunityUseCase: new DeleteOpportunityUseCaseImpl(),
  updateOpportunityUseCase: new UpdateOpportunityUseCaseImpl(),
  createOpportunityUseCase: new CreateOpportunityUseCaseImpl(),
  getOpportunityUseCase: new GetOpportunityUseCaseImpl(),
  // Customer use cases
  getAllCustomersUseCase: new GetAllCustomersUseCaseImpl(),
  addCustomerUseCase: new AddCustomerUseCaseImpl(),
  updateCustomerUseCase: new UpdateCustomerUseCaseImpl(),
  // User
  getCurrentUserUseCase: new GetCurrentUserUseCaseImpl(),
  getAllUsersUseCase: new GetAllUsersUseCaseImpl(),
  // Notification
  getNotificationsUseCase: new GetNotificationsUseCaseImpl(),
  saveNotificationUseCase: new SaveNotificationUseCaseImpl(),
};

export const {
  getPlatformConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  sendAttachmentMessageUseCase,
  subscribeNewMessageUseCase,
  getFacebookPagesUseCase,
  getUserInfoUseCase,
  getAllLeadsUseCase,
  getLeadUseCase,
  addLeadUseCase,
  updateLeadUseCase,
  connectFacebookPageUseCase,
  getAllOpportunitiesUseCase,
  getOpportunitiesByLeadUseCase,
  updateOpportunityUseCase,
  deleteOpportunityUseCase,
  getAllCustomersUseCase,
  addCustomerUseCase,
  updateCustomerUseCase,
  getZaloOAuthLinkUseCase,
  connectZaloPageUseCase,
  createOpportunityUseCase,
  getOpportunityUseCase,
  getCurrentUserUseCase,
  getAllUsersUseCase,
  getLinkedPagesUseCase,
  unlinkPageUseCase,
  getNotificationsUseCase,
  saveNotificationUseCase,
  connectTelegramPageUseCase,
  adminGetPlatformConversationsUseCase,
} = useCases;
