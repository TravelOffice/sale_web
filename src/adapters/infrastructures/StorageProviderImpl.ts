import StorageProvider from './interfaces/StorageProvider';

export default class StorageProviderImpl implements StorageProvider {
  getItem = async (key: string): Promise<any> => localStorage.getItem(key)

  removeItem = async (key: string): Promise<void> => localStorage.removeItem(key);

  setItem = async (key: string, value: any): Promise<void> => localStorage.setItem(key, value);
}
