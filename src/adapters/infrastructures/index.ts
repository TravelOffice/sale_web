import ApiProvider from '@adapter/infrastructures/interfaces/ApiProvider';
import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';
import ApiProviderImpl from '@adapter/infrastructures/ApiProviderImpl';
import StorageProviderImpl from '@adapter/infrastructures/StorageProviderImpl';
import SessionStorageProviderImpl from '@adapter/infrastructures/SessionStorageProviderImpl';
import MailApiProviderImpl from '@adapter/infrastructures/MailApiProviderImpl';
import { MailSearchProvider } from '@adapter/infrastructures/interfaces/MailSearchProvider';
import MailSearchProviderImpl from '@adapter/infrastructures/MailSearchProviderImpl';

interface Infrastructures {
  apiProvider: ApiProvider,
  mailApiProvider: ApiProvider,
  storageProvider: StorageProvider,
  sessionStorageProvider: StorageProvider,
  mailSearchProvider: MailSearchProvider,
}

const infrastructures : Infrastructures = {
  apiProvider: new ApiProviderImpl(),
  mailApiProvider: new MailApiProviderImpl(),
  storageProvider: new StorageProviderImpl(),
  sessionStorageProvider: new SessionStorageProviderImpl(),
  mailSearchProvider: new MailSearchProviderImpl(),
};

export const {
  apiProvider,
  mailApiProvider,
  storageProvider,
  sessionStorageProvider,
  mailSearchProvider,
} = infrastructures;
