import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import FacebookPageRepositoryImpl from '@adapter/repositories/FacebookPageRepositoryImpl';
import { AccountConnectionRepository } from '@adapter/repositories/interfaces/AccountConnectionRepository';
import AccountConnectionRepositoryImpl from '@adapter/repositories/AccountConnectionRepositoryImpl';
import { ZaloPageRepository } from '@adapter/repositories/interfaces/ZaloPageRepository';
import ZaloPageRepositoryImpl from '@adapter/repositories/ZaloPageRepositoryImpl';
import { NotificationRepository } from '@adapter/repositories/interfaces/NotificationRepository';
import NotificationRepositoryImpl from '@adapter/repositories/NotificationRepositoryImpl';
import { MailRepository } from '@adapter/repositories/interfaces/MailRepository';
import MailRepositoryImpl from '@adapter/repositories/MailRepositoryImpl';
import { BookingRepository } from '@adapter/repositories/interfaces/BookingRepository';
import BookingRepositoryImpl from '@adapter/repositories/BookingRepositoryImpl';
import { CustomerRepository } from '@adapter/repositories/interfaces/CustomerRepository';
import CustomerRepositoryImpl from '@adapter/repositories/CustomerRepositoryImpl';
import { ChatRepository } from './interfaces/ChatRepository';
import ChatRepositoryImpl from './ChatRepositoryImpl';
import { S3Repository } from './interfaces/S3Repository';
import S3RepositoryImpl from './S3RepositoryImpl';
import { LeadRepository } from './interfaces/LeadRepository';
import LeadRepositoryImpl from './LeadRepositoryImpl';
import RolePermissionRepository from './interfaces/RolePermissionRepository';
import RolePermissionRepositoryImpl from './RolePermissionRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
  facebookRepository: FacebookRepository,
  zaloPageRepository: ZaloPageRepository,
  s3Repository: S3Repository,
  leadRepository: LeadRepository,
  pageConnectionRepository: AccountConnectionRepository,
  notificationRepository: NotificationRepository,
  rolePermissionRepository: RolePermissionRepository,
  mailRepository: MailRepository,
  bookingRepository: BookingRepository,
  customerRepository: CustomerRepository,
}

const repositories: Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
  facebookRepository: new FacebookPageRepositoryImpl(),
  zaloPageRepository: new ZaloPageRepositoryImpl(),
  s3Repository: new S3RepositoryImpl(),
  leadRepository: new LeadRepositoryImpl(),
  pageConnectionRepository: new AccountConnectionRepositoryImpl(),
  notificationRepository: new NotificationRepositoryImpl(),
  rolePermissionRepository: new RolePermissionRepositoryImpl(),
  mailRepository: new MailRepositoryImpl(),
  bookingRepository: new BookingRepositoryImpl(),
  customerRepository: new CustomerRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
  facebookRepository,
  zaloPageRepository,
  s3Repository,
  leadRepository,
  pageConnectionRepository,
  notificationRepository,
  rolePermissionRepository,
  mailRepository,
  bookingRepository,
  customerRepository,
} = repositories;
