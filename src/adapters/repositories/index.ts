import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import FacebookPageRepositoryImpl from '@adapter/repositories/FacebookPageRepositoryImpl';
import { ChatRepository } from './interfaces/ChatRepository';
import ChatRepositoryImpl from './ChatRepositoryImpl';
import { S3Repository } from './interfaces/S3Repository';
import S3RepositoryImpl from './S3RepositoryImpl';
import { LeadRepository } from './interfaces/LeadRepository';
import LeadRepositoryImpl from './LeadRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
  facebookRepository: FacebookRepository,
  s3Repository: S3Repository,
  leadRepository: LeadRepository,
}

const repositories : Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
  facebookRepository: new FacebookPageRepositoryImpl(),
  s3Repository: new S3RepositoryImpl(),
  leadRepository: new LeadRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
  facebookRepository,
  s3Repository,
  leadRepository,
} = repositories;
