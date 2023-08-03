import { UpdateAccountFormData, User } from '@domain/entities/User';
import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';

export interface UserPresenter {
  getCurrentUser: () => Promise<User>;
  getAllUsers: () => Promise<Array<User>>;
  addUser: (user: User) => Promise<User>;
  getUser: (userId: string) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
  updateCurrentUser: (user: UpdateAccountFormData) => Promise<User>;
  uploadAvatarAttachment: (file: File) => Promise<PresignedUrl>
}
