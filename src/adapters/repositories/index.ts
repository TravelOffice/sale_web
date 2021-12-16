import UserRepository from '@adapter/repositories/interfaces/UserRepository';
import UserRepositoryImpl from '@adapter/repositories/UserRepositoryImpl';
import AuthRepository from '@adapter/repositories/interfaces/AuthRepository';
import AuthRepositoryImpl from '@adapter/repositories/AuthRepositoryImpl';

interface Repositories {
  userRepository: UserRepository,
  authRepository: AuthRepository,
}

const repositories : Repositories = {
  userRepository: new UserRepositoryImpl(),
  authRepository: new AuthRepositoryImpl(),
};

export const {
  userRepository,
  authRepository,
} = repositories;
