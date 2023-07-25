import GetUserInfoUseCaseImpl from '@domain/useCases/chat/GetUserInfoUseCaseImpl';
import GetFacebookPagesUseCaseImpl from '@domain/useCases/facebook/GetFacebookPagesUseCaseImpl';
import { GetUserInfoUseCase } from '@domain/useCases/interfaces/chat/GetUserInfoUseCase';
import { GetFacebookPagesUseCase } from '@domain/useCases/interfaces/facebook/GetFacebookPagesUseCase';
import { GetNotificationsUseCase } from '@domain/useCases/interfaces/notification/GetNotificationsUseCase';
import { SaveNotificationsUseCase } from '@domain/useCases/interfaces/notification/SaveNotificationsUseCase';
import { ConnectFacebookPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectFacebookPageUseCase';
import { ConnectTelegramPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectTelegramPageUseCase';
import { ConnectZaloPageUseCase } from '@domain/useCases/interfaces/pageConnection/ConnectZaloPageUseCase';
import { GetAllUsersUseCase } from '@domain/useCases/interfaces/user/GetAllUsersUseCase';
import { GetCurrentUserUseCase } from '@domain/useCases/interfaces/user/GetCurrentUserUseCase';
import { GetZaloOAuthLinkUseCase } from '@domain/useCases/interfaces/zalo/GetZaloOAuthLinkUseCase';
import GetNotificationsUseCaseImpl from '@domain/useCases/notification/GetNotificationsUseCaseImpl';
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
import { DraftMailUseCase } from '@domain/useCases/interfaces/mail/DraftMailUseCase';
import DraftMailUseCaseImpl from '@domain/useCases/mail/DraftMailUseCaseImpl';
import { DeleteMailUseCase } from '@domain/useCases/interfaces/mail/DeleteMailUseCase';
import DeleteMailUseCaseImpl from '@domain/useCases/mail/DeleteMailUseCaseImpl';
import { GetMailServerUseCase } from '@domain/useCases/interfaces/mail/GetMailServerUseCase';
import GetMailServerUseCaseImpl from '@domain/useCases/mail/GetMailServerUseCaseImpl';
import { AutoLinkEmailUseCase } from '@domain/useCases/interfaces/mail/AutoLinkEmailUseCase';
import AutoLinkEmailUseCaseImpl from '@domain/useCases/mail/AutoLinkEmailUseCaseImpl';
import ChangeMailboxUseCaseImpl from '@domain/useCases/mail/ChangeMailboxUseCaseImpl';
import { ChangeMailboxUseCase } from '@domain/useCases/interfaces/mail/ChangeMailboxUseCase';
import GetAllTourTemplatesUseCaseImpl from '@domain/useCases/tourTemplate/GetAllTourTemplatesUseCaseImpl';
import GetTourTemplateUseCaseImpl from '@domain/useCases/tourTemplate/GetTourTemplateUseCaseImpl';
import AddTourTemplateUseCaseImpl from '@domain/useCases/tourTemplate/AddTourTemplateUseCaseImpl';
import UpdateTourTemplateUseCaseImpl from '@domain/useCases/tourTemplate/UpdateTourTemplateUseCaseImpl';
import { GetAllTourTemplatesUseCase } from '@domain/useCases/interfaces/tourTemplate/GetAllTourTemplatesUseCase';
import { GetTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/GetTourTemplateUseCase';
import { AddTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/AddTourTemplateUseCase';
import { UpdateTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/UpdateTourTemplateUseCase';
import { GetAllSourcesUseCase } from '@domain/useCases/interfaces/source/GetAllSourcesUseCase';
import GetAllSourcesUseCaseImpl from '@domain/useCases/source/GetAllSourcesUseCaseImpl';
import GetAllReceiptsUseCaseImpl from '@domain/useCases/receipt/GetAllReceiptsUseCaseImpl';
import { CreateDepartureTourUseCase } from '@domain/useCases/interfaces/tour/CreateDepartureTourUseCase';
import { GetAllReceiptsUseCase } from '@domain/useCases/interfaces/receipt/GetAllReceiptsTemplateUseCase';
import { GetAllToursLocationUseCase } from '@domain/useCases/interfaces/tour/GetAllToursLocationUseCase';
import { GetAllToursTemplateUseCase } from '@domain/useCases/interfaces/tour/GetAllToursTemplateUseCase';
import CreateReceiptUseCaseImpl from '@domain/useCases/receipt/CreateReceiptUseCaseImpl';
import { CreateReceiptUseCase } from '@domain/useCases/interfaces/receipt/CreateReceiptUseCase';
import { UpdateReceiptUseCase } from '@domain/useCases/interfaces/receipt/UpdateReceiptUseCase';
import UpdateReceiptUseCaseImpl from '@domain/useCases/receipt/UpdateReceiptUseCaseImpl';
import { DeleteReceiptUseCase } from '@domain/useCases/interfaces/receipt/DeleteReceiptUseCase';
import DeleteReceiptUseCaseImpl from '@domain/useCases/receipt/DeleteReceiptUseCaseImpl';
import { GetAllSuppliersUseCase } from '@domain/useCases/interfaces/supplier/GetAllSuppliersUseCase';
import { UpdateSupplierUseCase } from '@domain/useCases/interfaces/supplier/UpdateSupplierUseCase';
import { AddSupplierUseCase } from '@domain/useCases/interfaces/supplier/AddSupplierUseCase';
import { GetSupplierUseCase } from '@domain/useCases/interfaces/supplier/GetSupplierUseCase';
import GetAllSuppliersUseCaseImpl from '@domain/useCases/supplier/GetAllSuppliersUseCaseImpl';
import AddSupplierUseCaseImpl from '@domain/useCases/supplier/AddSupplierUseCaseImpl';
import UpdateSupplierUseCaseImpl from '@domain/useCases/supplier/UpdateSupplierUseCaseImpl';
import GetSupplierUseCaseImpl from '@domain/useCases/supplier/GetSupplierUseCaseImpl';
import {
  GetAllPaymentVouchersUseCase,
} from '@domain/useCases/interfaces/paymentVoucher/GetAllPaymentVouchersTemplateUseCase';
import { CreatePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/CreatePaymentVoucherUseCase';
import { UpdatePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/UpdatePaymentVoucherUseCase';
import { DeletePaymentVoucherUseCase } from '@domain/useCases/interfaces/paymentVoucher/DeletePaymentVoucherUseCase';
import GetAllPaymentVouchersUseCaseImpl from '@domain/useCases/paymentVoucher/GetAllPaymentVouchersUseCaseImpl';
import CreatePaymentVoucherUseCaseImpl from '@domain/useCases/paymentVoucher/CreatePaymentVoucherUseCaseImpl';
import UpdatePaymentVoucherUseCaseImpl from '@domain/useCases/paymentVoucher/UpdatePaymentVoucherUseCaseImpl';
import DeletePaymentVoucherUseCaseImpl from '@domain/useCases/paymentVoucher/DeletePaymentVoucherUseCaseImpl';
import { UploadPaymentVoucherFileUseCase } from '@domain/useCases/interfaces/paymentVoucher/SendAttachmentMessageUseCase';
import UploadPaymentVoucherFileUseCaseImpl from '@domain/useCases/paymentVoucher/UploadPaymentVoucherFileUseCaseImpl';
import UpdateDepartureTourUseCaseImpl from '@domain/useCases/tour/UpdateDepartureTourUseCaseImpl';
import { GetDepartureTourUseCase } from '@domain/useCases/interfaces/tour/GetDepartureTourUseCase';
import GetDepartureTourUseCaseImpl from '@domain/useCases/tour/GetDepartureTourUseCaseImpl';
import { UpdateDepartureTourUseCase } from '@domain/useCases/interfaces/tour/UpdateDepartureTourUseCase';
import AdminGetPlatformConversationsUseCaseImpl from './chat/AdminGetPlatformConversationsUseCaseImpl';
import GetMessagesUseCaseImpl from './chat/GetMessagesUseCaseImpl';
import GetPlatformConversationsUseCaseImpl from './chat/GetPlatformConversationsUseCaseImpl';
import SendAttachmentMessageUseCaseImpl from './chat/SendAttachmentMessageUseCaseImpl';
import SendMessageUseCaseImpl from './chat/SendMessageUseCaseImpl';
import SubscribeNewMessageUseCaseImpl from './chat/SubscribeNewMessageUseCaseImpl';
import { AdminGetPlatformConversationsUseCase } from './interfaces/chat/AdminGetPlatformConversationsUseCase';
import { GetMessagesUseCase } from './interfaces/chat/GetMessagesUseCase';
import { GetPlatformConversationsUseCase } from './interfaces/chat/GetPlatformConversationsUseCase';
import { SendAttachmentMessageUseCase } from './interfaces/chat/SendAttachmentMessageUseCase';
import { SendMessageUseCase } from './interfaces/chat/SendMessageUseCase';
import { SubscribeNewMessageUseCase } from './interfaces/chat/SubscribeNewMessageUseCase';
import { GetLinkedPagesUseCase } from './interfaces/pageConnection/GetLinkedPagesUseCase';
import { UnlinkPageUseCase } from './interfaces/pageConnection/UnlinkPageUseCase';
import { AddUserUseCase } from './interfaces/user/AddUserUseCase';
import { GetUserUseCase } from './interfaces/user/GetUserUseCase';
import { UpdateUserUseCase } from './interfaces/user/UpdateUserUseCase';
import { GetAllPermissionsUseCase } from './interfaces/rolePermission/GetAllPermissionsUseCase';
import { GetAllRolesUseCase } from './interfaces/rolePermission/GetAllRolesUseCase';
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
import AddCustomerUseCaseImpl from './customer/AddCustomerUseCaseImpl';
import GetAllCustomersUseCaseImpl from './customer/GetAllCustomersUseCaseImpl';
import GetBookingsOfCustomerUseCaseImpl from './customer/GetBookingsOfCustomerUseCaseImpl';
import GetCustomerUseCaseImpl from './customer/GetCustomerUseCaseImpl';
import GetLeadsOfCustomerUseCaseImpl from './customer/GetLeadsOfCustomerUseCaseImpl';
import UpdateCustomerUseCaseImpl from './customer/UpdateCustomerUseCaseImpl';
import { AddCustomerUseCase } from './interfaces/customer/AddCustomerUseCase';
import { GetAllCustomersUseCase } from './interfaces/customer/GetAllCustomersUseCase';
import { GetBookingsOfCustomerUseCase } from './interfaces/customer/GetBookingsOfCustomerUseCase';
import { GetCustomerUseCase } from './interfaces/customer/GetCustomerUseCase';
import { GetLeadsOfCustomerUseCase } from './interfaces/customer/GetLeadsOfCustomerUseCase';
import { UpdateCustomerUseCase } from './interfaces/customer/UpdateCustomerUseCase';
// Tour
import CreateDepartureTourUseCaseImpl from './tour/CreateDepartureTourUseCaseImpl';
import GetAllToursTemplateUseCaseImpl from './tour/GetAllToursTemplateUseCaseImpl';
import GetAllToursLocationUseCaseImpl from './tour/GetAllToursLocationUseCaseImpl';
import { GetAllDepartureToursUseCase } from './interfaces/tour/GetAllDepartureToursUseCase';
import GetAllDepartureToursUseCaseImpl from './tour/GetAllDepartureToursUseCaseImpl';
import { TakeCareTourUseCase } from './interfaces/tour/TakeCareTourUseCase';
import TakeCareTourUseCaseImpl from './tour/TakeCareTourUseCaseImpl';
import { AssignTourOperator } from './interfaces/tour/AssignTourOperator';
import AssignTourOperatorImpl from './tour/AssignTourOperatorImpl';

interface UseCases {
  // Chat
  getPlatformConversationsUseCase: GetPlatformConversationsUseCase,
  getMessagesUseCase: GetMessagesUseCase,
  sendMessageUseCase: SendMessageUseCase,
  subscribeNewMessageUseCase: SubscribeNewMessageUseCase,
  getFacebookPagesUseCase: GetFacebookPagesUseCase,
  sendAttachmentMessageUseCase: SendAttachmentMessageUseCase,
  connectFacebookPageUseCase: ConnectFacebookPageUseCase,
  getUserInfoUseCase: GetUserInfoUseCase,
  getLinkedPagesUseCase: GetLinkedPagesUseCase,
  unlinkPageUseCase: UnlinkPageUseCase,
  adminGetPlatformConversationsUseCase: AdminGetPlatformConversationsUseCase,
  manualAssignChatUseCase: ManualAssignChatUseCase,
  // Tour Template
  getAllTourTemplatesUseCase: GetAllTourTemplatesUseCase
  getTourTemplateUseCase: GetTourTemplateUseCase
  addTourTemplateUseCase: AddTourTemplateUseCase
  updateTourTemplateUseCase: UpdateTourTemplateUseCase
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
  draftMailUseCase: DraftMailUseCase,
  deleteMailUseCase: DeleteMailUseCase,
  getMailServerUseCase: GetMailServerUseCase,
  autoLinkEmailUseCase: AutoLinkEmailUseCase,
  changeMailboxUseCase: ChangeMailboxUseCase,
  // Customer
  addCustomerUseCase: AddCustomerUseCase,
  getAllCustomersUseCase: GetAllCustomersUseCase,
  getBookingsOfCustomerUseCase: GetBookingsOfCustomerUseCase,
  getCustomerUseCase: GetCustomerUseCase,
  getLeadsOfCustomerUseCase: GetLeadsOfCustomerUseCase,
  updateCustomerUseCase: UpdateCustomerUseCase,
  // Tour
  createDepartureTourUseCase: CreateDepartureTourUseCase,
  updateDepartureTourUseCase: UpdateDepartureTourUseCase,
  getDepartureTourUseCase: GetDepartureTourUseCase,
  getAllToursTemplateUseCase: GetAllToursTemplateUseCase,
  getAllToursLocationUseCase: GetAllToursLocationUseCase,
  getAllDepartureToursUseCase: GetAllDepartureToursUseCase,
  takeCareTourUseCase: TakeCareTourUseCase,
  assignTourOperator: AssignTourOperator,
  // Source
  getAllSourcesUseCase: GetAllSourcesUseCase,
  // Receipt
  getAllReceiptsUseCase: GetAllReceiptsUseCase,
  createReceiptUseCase: CreateReceiptUseCase,
  updateReceiptUseCase: UpdateReceiptUseCase,
  deleteReceiptUseCase: DeleteReceiptUseCase
  // Supplier
  getAllSuppliersUseCase: GetAllSuppliersUseCase,
  addSupplierUseCase: AddSupplierUseCase,
  updateSupplierUseCase: UpdateSupplierUseCase,
  getSupplierUseCase: GetSupplierUseCase
  // Payment Voucher
  getAllPaymentVouchersUseCase: GetAllPaymentVouchersUseCase,
  createPaymentVoucherUseCase: CreatePaymentVoucherUseCase,
  updatePaymentVoucherUseCase: UpdatePaymentVoucherUseCase,
  deletePaymentVoucherUseCase: DeletePaymentVoucherUseCase,
  uploadPaymentVoucherFileUseCase: UploadPaymentVoucherFileUseCase,
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
  // Tour Template use cases
  getAllTourTemplatesUseCase: new GetAllTourTemplatesUseCaseImpl(),
  getTourTemplateUseCase: new GetTourTemplateUseCaseImpl(),
  addTourTemplateUseCase: new AddTourTemplateUseCaseImpl(),
  updateTourTemplateUseCase: new UpdateTourTemplateUseCaseImpl(),
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
  draftMailUseCase: new DraftMailUseCaseImpl(),
  deleteMailUseCase: new DeleteMailUseCaseImpl(),
  getMailServerUseCase: new GetMailServerUseCaseImpl(),
  autoLinkEmailUseCase: new AutoLinkEmailUseCaseImpl(),
  changeMailboxUseCase: new ChangeMailboxUseCaseImpl(),
  // Customer
  addCustomerUseCase: new AddCustomerUseCaseImpl(),
  getAllCustomersUseCase: new GetAllCustomersUseCaseImpl(),
  getBookingsOfCustomerUseCase: new GetBookingsOfCustomerUseCaseImpl(),
  getCustomerUseCase: new GetCustomerUseCaseImpl(),
  getLeadsOfCustomerUseCase: new GetLeadsOfCustomerUseCaseImpl(),
  updateCustomerUseCase: new UpdateCustomerUseCaseImpl(),
  // Tour
  createDepartureTourUseCase: new CreateDepartureTourUseCaseImpl(),
  updateDepartureTourUseCase: new UpdateDepartureTourUseCaseImpl(),
  getDepartureTourUseCase: new GetDepartureTourUseCaseImpl(),
  getAllToursTemplateUseCase: new GetAllToursTemplateUseCaseImpl(),
  getAllToursLocationUseCase: new GetAllToursLocationUseCaseImpl(),
  getAllDepartureToursUseCase: new GetAllDepartureToursUseCaseImpl(),
  assignTourOperator: new AssignTourOperatorImpl(),
  takeCareTourUseCase: new TakeCareTourUseCaseImpl(),
  // Source
  getAllSourcesUseCase: new GetAllSourcesUseCaseImpl(),
  // Receipt
  getAllReceiptsUseCase: new GetAllReceiptsUseCaseImpl(),
  createReceiptUseCase: new CreateReceiptUseCaseImpl(),
  updateReceiptUseCase: new UpdateReceiptUseCaseImpl(),
  deleteReceiptUseCase: new DeleteReceiptUseCaseImpl(),
  // Supplier
  getAllSuppliersUseCase: new GetAllSuppliersUseCaseImpl(),
  addSupplierUseCase: new AddSupplierUseCaseImpl(),
  updateSupplierUseCase: new UpdateSupplierUseCaseImpl(),
  getSupplierUseCase: new GetSupplierUseCaseImpl(),
  // PaymentVoucher
  getAllPaymentVouchersUseCase: new GetAllPaymentVouchersUseCaseImpl(),
  createPaymentVoucherUseCase: new CreatePaymentVoucherUseCaseImpl(),
  updatePaymentVoucherUseCase: new UpdatePaymentVoucherUseCaseImpl(),
  deletePaymentVoucherUseCase: new DeletePaymentVoucherUseCaseImpl(),
  uploadPaymentVoucherFileUseCase: new UploadPaymentVoucherFileUseCaseImpl(),
};

export const {
  getPlatformConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  sendAttachmentMessageUseCase,
  subscribeNewMessageUseCase,
  getFacebookPagesUseCase,
  getUserInfoUseCase,
  getAllTourTemplatesUseCase,
  getTourTemplateUseCase,
  addTourTemplateUseCase,
  updateTourTemplateUseCase,
  connectFacebookPageUseCase,
  getZaloOAuthLinkUseCase,
  connectZaloPageUseCase,
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
  draftMailUseCase,
  deleteMailUseCase,
  getMailServerUseCase,
  autoLinkEmailUseCase,
  changeMailboxUseCase,
  addCustomerUseCase,
  getAllCustomersUseCase,
  getBookingsOfCustomerUseCase,
  getCustomerUseCase,
  getLeadsOfCustomerUseCase,
  updateCustomerUseCase,
  // Tour
  getAllDepartureToursUseCase,
  createDepartureTourUseCase,
  updateDepartureTourUseCase,
  getDepartureTourUseCase,
  getAllToursTemplateUseCase,
  getAllToursLocationUseCase,
  getAllSourcesUseCase,
  takeCareTourUseCase,
  assignTourOperator,
  // Receipt
  getAllReceiptsUseCase,
  createReceiptUseCase,
  updateReceiptUseCase,
  deleteReceiptUseCase,
  // Supplier
  getAllSuppliersUseCase,
  addSupplierUseCase,
  updateSupplierUseCase,
  getSupplierUseCase,
  // Payment Voucher
  getAllPaymentVouchersUseCase,
  createPaymentVoucherUseCase,
  updatePaymentVoucherUseCase,
  deletePaymentVoucherUseCase,
  uploadPaymentVoucherFileUseCase,
} = useCases;
