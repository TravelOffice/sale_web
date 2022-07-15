import StorageProvider from '@adapter/infrastructures/interfaces/StorageProvider';

export default class SessionStorageProviderImpl implements StorageProvider {
  getItem = async (key: string): Promise<any> => sessionStorage.getItem(key)

  removeItem = async (key: string): Promise<void> => sessionStorage.removeItem(key);

  setItem = async (key: string, value: any): Promise<void> => sessionStorage.setItem(key, value);
}
