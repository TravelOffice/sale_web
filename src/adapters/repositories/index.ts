import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import FacebookPageRepositoryImpl from '@adapter/repositories/FacebookPageRepositoryImpl';
import { AccountConnectionRepository } from '@adapter/repositories/interfaces/AccountConnectionRepository';
import AccountConnectionRepositoryImpl from '@adapter/repositories/AccountConnectionRepositoryImpl';
import { ChatRepository } from './interfaces/ChatRepository';
import ChatRepositoryImpl from './ChatRepositoryImpl';
import { S3Repository } from './interfaces/S3Repository';
import S3RepositoryImpl from './S3RepositoryImpl';
import { LeadRepository } from './interfaces/LeadRepository';
import LeadRepositoryImpl from './LeadRepositoryImpl';
import { OpportunityRepository } from './interfaces/OpportunityRepository';
import OpportunityRepositoryImpl from './OpportunityRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
  facebookRepository: FacebookRepository,
  s3Repository: S3Repository,
  leadRepository: LeadRepository,
  pageConnectionRepository: AccountConnectionRepository,
  opportunityRepository: OpportunityRepository,
}

const repositories : Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
  facebookRepository: new FacebookPageRepositoryImpl(),
  s3Repository: new S3RepositoryImpl(),
  leadRepository: new LeadRepositoryImpl(),
  pageConnectionRepository: new AccountConnectionRepositoryImpl(),
  opportunityRepository: new OpportunityRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
  facebookRepository,
  s3Repository,
  leadRepository,
  pageConnectionRepository,
  opportunityRepository,
} = repositories;
