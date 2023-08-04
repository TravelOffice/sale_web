import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import { UpdateAccountFormData, User } from '@domain/entities/User';
import {
  addUserUseCase,
  getAllUsersUseCase,
  getCurrentUserUseCase,
  getUserUseCase,
  updateCurrentUserUseCase,
  updateUserUseCase,
  uploadAvatarFileUseCase,
} from '@domain/useCases';

export default class UserPresenterImpl implements UserPresenter {
  getCurrentUser = async () => getCurrentUserUseCase.invoke();

  getAllUsers = async () => getAllUsersUseCase.invoke();

  getUser = async (userId: string) => getUserUseCase.invoke(userId);

  addUser = async (payload: User) => addUserUseCase.invoke(payload);

  updateUser = async (payload: User) => updateUserUseCase.invoke(payload);

  updateCurrentUser = async (
    payload: UpdateAccountFormData,
  ) => updateCurrentUserUseCase.invoke(payload);

  uploadAvatarAttachment = async (
    file: File,
  ) => uploadAvatarFileUseCase.invoke(file)
}
