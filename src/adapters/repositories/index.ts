import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import { FacebookRepository } from '@adapter/repositories/interfaces/FacebookRepository';
import FacebookPageRepositoryImpl from '@adapter/repositories/FacebookPageRepositoryImpl';
import { ChatRepository } from './interfaces/ChatRepository';
import ChatRepositoryImpl from './ChatRepositoryImpl';
import { LeadRepository } from './interfaces/LeadRepository';
import LeadRepositoryImpl from './LeadRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
  facebookRepository: FacebookRepository,
  leadRepository: LeadRepository,
}

const repositories : Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
  facebookRepository: new FacebookPageRepositoryImpl(),
  leadRepository: new LeadRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
  facebookRepository,
  leadRepository,
} = repositories;
