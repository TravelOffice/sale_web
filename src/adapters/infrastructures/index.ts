import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';
import ApiProviderImpl from '@adapter/infrastructures/ApiProviderImpl';
import StorageProviderImpl from '@adapter/infrastructures/StorageProviderImpl';

interface Infrastructures {
  apiProvider: ApiProvider,
  storageProvider: StorageProvider,
}

const infrastructures : Infrastructures = {
  apiProvider: new ApiProviderImpl(),
  storageProvider: new StorageProviderImpl(),
};

export const {
  apiProvider,
  storageProvider,
} = infrastructures;
