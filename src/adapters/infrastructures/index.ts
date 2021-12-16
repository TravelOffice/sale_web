import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';
import ApiProviderImpl from '@adapter/infrastructures/ApiProviderImpl';
import StorageProviderImpl from '@adapter/infrastructures/StorageProviderImpl';
import AuthProvider from '@adapter/infrastructures/interfaces/AuthProvider';
import AuthProviderImpl from '@adapter/infrastructures/AuthProviderImpl';

interface Infrastructures {
  apiProvider: ApiProvider,
  storageProvider: StorageProvider,
  authProvider: AuthProvider,
}

const infrastructures : Infrastructures = {
  apiProvider: new ApiProviderImpl(),
  storageProvider: new StorageProviderImpl(),
  authProvider: new AuthProviderImpl(),
};

export const {
  apiProvider,
  storageProvider,
  authProvider,
} = infrastructures;
