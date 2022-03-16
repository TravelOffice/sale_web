import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import { ChatRepository } from './interfaces/ChatRepository';
import ChatRepositoryImpl from './ChatRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  chatRepository: ChatRepository,
}

const repositories : Repositories = {
  userRepository: new UserRepositoryImpl(),
  chatRepository: new ChatRepositoryImpl(),
};

export const {
  userRepository,
  chatRepository,
} = repositories;
