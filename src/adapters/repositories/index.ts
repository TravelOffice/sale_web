import AccountConnectionRepositoryImpl from '@adapter/repositories/AccountConnectionRepositoryImpl';
import BookingRepositoryImpl from '@adapter/repositories/BookingRepositoryImpl';
import ChatRepositoryImpl from '@adapter/repositories/ChatRepositoryImpl';
import CustomerRepositoryImpl from '@adapter/repositories/CustomerRepositoryImpl';
import FacebookPageRepositoryImpl from '@adapter/repositories/FacebookPageRepositoryImpl';
import LeadRepositoryImpl from '@adapter/repositories/LeadRepositoryImpl';
import MailRepositoryImpl from '@adapter/repositories/MailRepositoryImpl';
import NotificationRepositoryImpl from '@adapter/repositories/NotificationRepositoryImpl';
import PaymentVoucherRepositoryImpl from '@adapter/repositories/PaymentVoucherRepositoryImpl';
import ReceiptRepositoryImpl from '@adapter/repositories/ReceiptRepositoryImpl';
import RolePermissionRepositoryImpl from '@adapter/repositories/RolePermissionRepositoryImpl';
import S3RepositoryImpl from '@adapter/repositories/S3RepositoryImpl';
import SourceRepositoryImpl from '@adapter/repositories/SourceRepositoryImpl';
import SupplierRepositoryImpl from '@adapter/repositories/SupplierRepositoryImpl';
import TourLocationRepositoryImpl from '@adapter/repositories/TourLocationRepositoryImpl';
import TourOperationRepositoryImpl from '@adapter/repositories/TourOperationRepositoryImpl';
import TourTemplatePresenterImpl from '@adapter/repositories/TourTemplateRepositoryImpl';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import ZaloPageRepositoryImpl from '@adapter/repositories/ZaloPageRepositoryImpl';
import { AccountConnectionRepository } from '@adapter/repositories/interfaces/AccountConnectionRepository';
import { BookingRepository } from '@adapter/repositories/interfaces/BookingRepository';
import { ChatRepository } from '@adapter/repositories/interfaces/ChatRepository';
import { CustomerRepository } from '@adapter/repositories/interfaces/CustomerRepository';
import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import { LeadRepository } from '@adapter/repositories/interfaces/LeadRepository';
import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import { NotificationRepository } from '@adapter/repositories/interfaces/NotificationRepository';
import { PaymentVoucherRepository } from '@adapter/repositories/interfaces/PaymentVoucherRepository';
import { ReceiptRepository } from '@adapter/repositories/interfaces/ReceiptRepository';
import RolePermissionRepository from '@adapter/repositories/interfaces/RolePermissionRepository';
import { S3Repository } from '@adapter/repositories/interfaces/S3Repository';
import { SourceRepository } from '@adapter/repositories/interfaces/SourceRepository';
import { SupplierRepository } from '@adapter/repositories/interfaces/SupplierRepository';
import { TourLocationRepository } from '@adapter/repositories/interfaces/TourLocationRepository';
import { TourOperationRepository } from '@adapter/repositories/interfaces/TourOperationRepository';
import { TourTemplateRepository } from '@adapter/repositories/interfaces/TourTemplateRepository';
import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import { ZaloPageRepository } from '@adapter/repositories/interfaces/ZaloPageRepository';
import MarketplaceRepositoryImpl from '@adapter/repositories/MarketplaceRepositoryImpl';
import TourRepositoryImpl from '@adapter/repositories/TourRepositoryImpl';
import { DepartureTourRepository } from '@adapter/repositories/interfaces/DepartureTourRepository';
import { MarketplaceRepository } from '@adapter/repositories/interfaces/MarketplaceRepository';
import { MarketplaceStatisticRepository } from '@adapter/repositories/interfaces/MarketplaceStatisticRepository';
import MarketplaceStatisticRepositoryImpl from '@adapter/repositories/MarketplaceStatisticRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
  facebookRepository: FacebookRepository,
  zaloPageRepository: ZaloPageRepository,
  s3Repository: S3Repository,
  leadRepository: LeadRepository,
  tourTemplateRepository: TourTemplateRepository,
  pageConnectionRepository: AccountConnectionRepository,
  notificationRepository: NotificationRepository,
  rolePermissionRepository: RolePermissionRepository,
  mailRepository: MailRepository,
  bookingRepository: BookingRepository,
  customerRepository: CustomerRepository,
  tourRepository: DepartureTourRepository,
  sourceRepository: SourceRepository,
  receiptRepository: ReceiptRepository,
  supplierRepository: SupplierRepository,
  paymentVoucherRepository: PaymentVoucherRepository,
  tourOperationRepository: TourOperationRepository,
  tourLocationRepository: TourLocationRepository,
  marketplaceRepository: MarketplaceRepository,
  marketplaceStatisticRepository: MarketplaceStatisticRepository,
}

const repositories: Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
  facebookRepository: new FacebookPageRepositoryImpl(),
  zaloPageRepository: new ZaloPageRepositoryImpl(),
  s3Repository: new S3RepositoryImpl(),
  leadRepository: new LeadRepositoryImpl(),
  tourTemplateRepository: new TourTemplatePresenterImpl(),
  pageConnectionRepository: new AccountConnectionRepositoryImpl(),
  notificationRepository: new NotificationRepositoryImpl(),
  rolePermissionRepository: new RolePermissionRepositoryImpl(),
  mailRepository: new MailRepositoryImpl(),
  bookingRepository: new BookingRepositoryImpl(),
  customerRepository: new CustomerRepositoryImpl(),
  tourRepository: new TourRepositoryImpl(),
  sourceRepository: new SourceRepositoryImpl(),
  receiptRepository: new ReceiptRepositoryImpl(),
  supplierRepository: new SupplierRepositoryImpl(),
  paymentVoucherRepository: new PaymentVoucherRepositoryImpl(),
  tourOperationRepository: new TourOperationRepositoryImpl(),
  tourLocationRepository: new TourLocationRepositoryImpl(),
  marketplaceRepository: new MarketplaceRepositoryImpl(),
  marketplaceStatisticRepository: new MarketplaceStatisticRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
  facebookRepository,
  zaloPageRepository,
  s3Repository,
  leadRepository,
  tourTemplateRepository,
  pageConnectionRepository,
  notificationRepository,
  rolePermissionRepository,
  mailRepository,
  bookingRepository,
  customerRepository,
  tourRepository,
  sourceRepository,
  receiptRepository,
  supplierRepository,
  paymentVoucherRepository,
  tourOperationRepository,
  tourLocationRepository,
  marketplaceRepository,
  marketplaceStatisticRepository,
} = repositories;
