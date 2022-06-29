import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';
import ApiProviderImpl from '@adapter/infrastructures/ApiProviderImpl';
import StorageProviderImpl from '@adapter/infrastructures/StorageProviderImpl';
import SessionStorageProviderImpl from '@adapter/infrastructures/SessionStorageProviderImpl';

interface Infrastructures {
  apiProvider: ApiProvider,
  storageProvider: StorageProvider,
  sessionStorageProvider: StorageProvider,
}

const infrastructures : Infrastructures = {
  apiProvider: new ApiProviderImpl(),
  storageProvider: new StorageProviderImpl(),
  sessionStorageProvider: new SessionStorageProviderImpl(),
};

export const {
  apiProvider,
  storageProvider,
  sessionStorageProvider,
} = infrastructures;
