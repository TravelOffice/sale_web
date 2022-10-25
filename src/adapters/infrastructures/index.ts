import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';
import ApiProviderImpl from '@adapter/infrastructures/ApiProviderImpl';
import StorageProviderImpl from '@adapter/infrastructures/StorageProviderImpl';
import SessionStorageProviderImpl from '@adapter/infrastructures/SessionStorageProviderImpl';
import MailApiProviderImpl from '@adapter/infrastructures/MailApiProviderImpl';
import { SearchProvider } from '@adapter/infrastructures/interfaces/SearchProvider';
import SearchProviderImpl from '@adapter/infrastructures/SearchProviderImpl';

interface Infrastructures {
  apiProvider: ApiProvider,
  mailApiProvider: ApiProvider,
  storageProvider: StorageProvider,
  sessionStorageProvider: StorageProvider,
  searchProvider: SearchProvider,
}

const infrastructures : Infrastructures = {
  apiProvider: new ApiProviderImpl(),
  mailApiProvider: new MailApiProviderImpl(),
  storageProvider: new StorageProviderImpl(),
  sessionStorageProvider: new SessionStorageProviderImpl(),
  searchProvider: new SearchProviderImpl(),
};

export const {
  apiProvider,
  mailApiProvider,
  storageProvider,
  sessionStorageProvider,
  searchProvider,
} = infrastructures;
