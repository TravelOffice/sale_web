import { Page } from '@domain/entities/chat/Page';
import { User } from '@domain/entities/User';

export default interface UserRepository {
  getUser: (id: string) => Promise<User>,
  getCurrentUser: () => Promise<User>,
  getAllUsers: () => Promise<Array<User>>,
  getLinkedPages: (refresh: boolean) => Promise<Array<Page>>;
}
