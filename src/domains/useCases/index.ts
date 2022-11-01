import GetUserInfoUseCaseImpl from '@domain/useCases/chat/GetUserInfoUseCaseImpl';
import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetUserInfoUseCase } from '@domain/useCases/interfaces/chat/GetUserInfoUseCase';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { GetNotificationsUseCase } from '@domain/useCases/interfaces/notification/GetNotificationsUseCase';
import { SaveNotificationsUseCase } from '@domain/useCases/interfaces/notification/SaveNotificationsUseCase';
import { CreateOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/CreateOpportunityUseCase';
import { GetOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/GetOpportunityUseCase';
import { ConnectFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectFacebookPageUseCase';
import { ConnectTelegramPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectTelegramPageUseCase';
import { ConnectZaloPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectZaloPageUseCase';
import { GetAllUsersUseCase } from '@domain/useCases/interfaces/user/GetAllUsersUseCase';
import { GetCurrentUserUseCase } from '@domain/useCases/interfaces/user/GetCurrentUserUseCase';
import { GetZaloOAuthLinkUseCase } from '@domain/useCases/interfaces/zalo/GetZaloOAuthLinkUseCase';
import GetNotificationsUseCaseImpl from '@domain/useCases/notification/GetNotificationsUseCaseImpl';
import CreateOpportunityUseCaseImpl from '@domain/useCases/opportunity/CreateOpportunityUseCaseImpl';
import GetOpportunityUseCaseImpl from '@domain/useCases/opportunity/GetOpportunityUseCaseImpl';
import ConnectFacebookPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectFacebookPageUseCaseImpl';
import ConnectTelegramPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectTelegramPageUseCaseImpl';
import ConnectZaloPageUseCaseImpl from '@domain/useCases/pageConnection/ConnectZaloPageUseCaseImpl';
import GetZaloOAuthLinkUseCaseImpl from '@domain/useCases/zalo/GetZaloOAuthLinkUseCaseImpl';
import { ManualAssignChatUseCase } from '@domain/useCases/interfaces/chat/ManualAssignChatUseCase';
import ManualAssignChatUseCaseImpl from '@domain/useCases/chat/ManualAssignChatUseCaseImpl';
import { LinkEmailUseCase } from '@domain/useCases/interfaces/mail/LinkEmailUseCase';
import LinkEmailUseCaseImpl from '@domain/useCases/mail/LinkEmailUseCaseImpl';
import { GetMailAccountsUseCase } from '@domain/useCases/interfaces/mail/GetMailAccountsUseCase';
import { GetMailboxesUseCase } from '@domain/useCases/interfaces/mail/GetMailboxesUseCase';
import { GetMailMessagesUseCase } from '@domain/useCases/interfaces/mail/GetMailMessagesUseCase';
import GetMailAccountsUseCaseImpl from '@domain/useCases/mail/GetMailAccountsUseCaseImpl';
import GetMailboxesUseCaseImpl from '@domain/useCases/mail/GetMailboxesUseCaseImpl';
import GetMailMessagesUseCaseImpl from '@domain/useCases/mail/GetMailMessagesUseCaseImpl';
import GetMailThreadUseCaseImpl from '@domain/useCases/mail/GetMailThreadUseCaseImpl';
import { GetMailThreadUseCase } from '@domain/useCases/interfaces/mail/GetMailThreadUseCase';
import SendMailUseCaseImpl from '@domain/useCases/mail/SendMailUseCaseImpl';
import { SendMailUseCase } from '@domain/useCases/interfaces/mail/SendMailUseCase';
import { UploadMailAttachmentUseCase } from '@domain/useCases/interfaces/mail/UploadMailAttachmentUseCase';
import UploadMailAttachmentUseCaseImpl from '@domain/useCases/mail/UploadMailAttachmentUseCaseImpl';
import { SyncMailUseCase } from '@domain/useCases/interfaces/mail/SyncMailUseCase';
import SyncMailUseCaseImpl from '@domain/useCases/mail/SyncMailUseCaseImpl';
import { SearchMailUseCase } from '@domain/useCases/interfaces/mail/SearchMailUseCase';
import SearchMailUseCaseImpl from '@domain/useCases/mail/SearchMailUseCase';
import { GetMailServerUseCase } from '@domain/useCases/interfaces/mail/GetMailServerUseCase';
import GetMailServerUseCaseImpl from '@domain/useCases/mail/GetMailServerUseCaseImpl';
import AdminGetPlatformConversationsUseCaseImpl from './chat/AdminGetPlatformConversationsUseCaseImpl';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import GetPlatformConversationsUseCaseImpl from './chat/GetPlatformConversationsUseCaseImpl';
import SendAttachmentMessageUseCaseImpl from './chat/SendAttachmentMessageUseCaseImpl';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';
import AddCustomerUseCaseImpl from './customer/AddCustomerUseCaseImpl';
import GetAllCustomersUseCaseImpl from './customer/GetAllCustomersUseCaseImpl';
import UpdateCustomerUseCaseImpl from './customer/UpdateCustomerUseCaseImpl';
import { AdminGetPlatformConversationsUseCase } from './interfaces/chat/AdminGetPlatformConversationsUseCase';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import { GetPlatformConversationsUseCase } from './interfaces/chat/GetPlatformConversationsUseCase';
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
import { GetLinkedPagesUseCase } from './interfaces/pageConnection/GetLinkedPagesUseCase';
import { UnlinkPageUseCase } from './interfaces/pageConnection/UnlinkPageUseCase';
import { AddUserUseCase } from './interfaces/user/AddUserUseCase';
import { GetUserUseCase } from './interfaces/user/GetUserUseCase';
import { UpdateUserUseCase } from './interfaces/user/UpdateUserUseCase';
import { GetAllPermissionsUseCase } from './interfaces/rolePermission/GetAllPermissionsUseCase';
import { GetAllRolesUseCase } from './interfaces/rolePermission/GetAllRolesUseCase';
import AddLeadUseCaseImpl from './lead/AddLeadUseCaseImpl';
import GetAllLeadsUseCaseImpl from './lead/GetAllLeadsUseCaseImpl';
import GetLeadUseCaseImpl from './lead/GetLeadUseCaseImpl';
import UpdateLeadUseCaseImpl from './lead/UpdateLeadUseCaseImpl';
import DeleteOpportunityUseCaseImpl from './opportunity/DeleteOpportunityUseCaseImpl';
import GetAllOpportunitiesUseCaseImpl from './opportunity/GetAllOpportunitiesUseCaseImpl';
import GetOpportunitiesByLeadUseCaseImpl from './opportunity/GetOpportunitiesByLeadUseCaseImpl';
import UpdateOpportunityUseCaseImpl from './opportunity/UpdateOpportunityUseCaseImpl';
import GetLinkedPagesUseCaseImpl from './pageConnection/GetLinkedPagesUseCaseImpl';
import UnlinkPageUseCaseImpl from './pageConnection/UnlinkPageUseCaseImpl';
import AddUserUseCaseImpl from './user/AddUserUseCaseImpl';
import GetAllUsersUseCaseImpl from './user/GetAllUsersUseCaseImpl';
import GetCurrentUserUseCaseImpl from './user/GetCurrentUserUseCaseImpl';
import GetUserUseCaseImpl from './user/GetUserUseCaseImpl';
import UpdateUserUseCaseImpl from './user/UpdateUserUseCaseImpl';
import GetAllPermissionsUseCaseImpl from './rolePermission/GetAllPermissionsUseCaseImpl';
import GetAllRolesUseCaseImpl from './rolePermission/GetAllRolesUseCaseImpl';
import { AddRoleUseCase } from './interfaces/rolePermission/AddRoleUseCase';
import { UpdateRoleUseCase } from './interfaces/rolePermission/UpdateRoleUseCase';
import AddRoleUseCaseImpl from './rolePermission/AddRoleUseCaseImpl';
import UpdateRoleUseCaseImpl from './rolePermission/UpdateRoleUseCaseImpl';
import { SubscribeNewNotificationUseCase } from './interfaces/notification/SubscribeNewNotificationUseCase';
import SubscribeNewNotificationUseCaseImpl from './notification/SubscribeNewNotificationUseCaseImpl';
import SaveNotificationsUseCaseImpl from './notification/SaveNotificationsUseCaseImpl';
import { ClearNotificationsUseCase } from './interfaces/notification/ClearNotificationsUseCase';
import ClearNotificationsUseCaseImpl from './notification/ClearNotificationsUseCaseImpl';

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
  manualAssignChatUseCase: ManualAssignChatUseCase,
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
  getUserUseCase: GetUserUseCase
  addUserUseCase: AddUserUseCase
  updateUserUseCase: UpdateUserUseCase
  // Notification
  getNotificationsUseCase: GetNotificationsUseCase,
  saveNotificationsUseCase: SaveNotificationsUseCase,
  clearNotificationsUseCase: ClearNotificationsUseCase,
  subscribeNewNotificationUseCase: SubscribeNewNotificationUseCase,
  // Role Permission
  getAllRolesUseCase: GetAllRolesUseCase,
  getAllPermissionsUseCase: GetAllPermissionsUseCase,
  addRoleUseCase: AddRoleUseCase
  updateRoleUseCase: UpdateRoleUseCase
  // Mail
  linkMailUseCase: LinkEmailUseCase,
  getMailAccountsUseCase: GetMailAccountsUseCase,
  getMailboxesUseCase: GetMailboxesUseCase,
  getMailMessagesUseCase: GetMailMessagesUseCase,
  syncMailUseCase: SyncMailUseCase,
  getMailThreadUseCase: GetMailThreadUseCase,
  sendMailUseCase: SendMailUseCase,
  uploadMailAttachmentUseCase: UploadMailAttachmentUseCase,
  searchMailUseCase: SearchMailUseCase,
  getMailServerUseCase: GetMailServerUseCase,
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
  manualAssignChatUseCase: new ManualAssignChatUseCaseImpl(),
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
  getUserUseCase: new GetUserUseCaseImpl(),
  addUserUseCase: new AddUserUseCaseImpl(),
  updateUserUseCase: new UpdateUserUseCaseImpl(),
  // Notification
  getNotificationsUseCase: new GetNotificationsUseCaseImpl(),
  saveNotificationsUseCase: new SaveNotificationsUseCaseImpl(),
  clearNotificationsUseCase: new ClearNotificationsUseCaseImpl(),
  subscribeNewNotificationUseCase: new SubscribeNewNotificationUseCaseImpl(),
  // Role Permission
  getAllRolesUseCase: new GetAllRolesUseCaseImpl(),
  getAllPermissionsUseCase: new GetAllPermissionsUseCaseImpl(),
  addRoleUseCase: new AddRoleUseCaseImpl(),
  updateRoleUseCase: new UpdateRoleUseCaseImpl(),
  // Mail
  linkMailUseCase: new LinkEmailUseCaseImpl(),
  getMailAccountsUseCase: new GetMailAccountsUseCaseImpl(),
  getMailboxesUseCase: new GetMailboxesUseCaseImpl(),
  getMailMessagesUseCase: new GetMailMessagesUseCaseImpl(),
  syncMailUseCase: new SyncMailUseCaseImpl(),
  getMailThreadUseCase: new GetMailThreadUseCaseImpl(),
  sendMailUseCase: new SendMailUseCaseImpl(),
  uploadMailAttachmentUseCase: new UploadMailAttachmentUseCaseImpl(),
  searchMailUseCase: new SearchMailUseCaseImpl(),
  getMailServerUseCase: new GetMailServerUseCaseImpl(),
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
  getUserUseCase,
  addUserUseCase,
  updateUserUseCase,
  getLinkedPagesUseCase,
  unlinkPageUseCase,
  getNotificationsUseCase,
  saveNotificationsUseCase,
  clearNotificationsUseCase,
  connectTelegramPageUseCase,
  adminGetPlatformConversationsUseCase,
  getAllRolesUseCase,
  getAllPermissionsUseCase,
  addRoleUseCase,
  updateRoleUseCase,
  subscribeNewNotificationUseCase,
  manualAssignChatUseCase,
  linkMailUseCase,
  getMailAccountsUseCase,
  getMailboxesUseCase,
  getMailMessagesUseCase,
  syncMailUseCase,
  getMailThreadUseCase,
  sendMailUseCase,
  uploadMailAttachmentUseCase,
  searchMailUseCase,
  getMailServerUseCase,
} = useCases;
