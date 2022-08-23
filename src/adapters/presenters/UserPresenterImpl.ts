import { UserPresenter } from '@adapter/presenters/interfaces/UserPresenter';
import { User } from '@domain/entities/User';
import {
  getCurrentUserUseCase, getAllUsersUseCase, getUserUseCase, addUserUseCase, updateUserUseCase,
} from '@domain/useCases';

export default class UserPresenterImpl implements UserPresenter {
  getCurrentUser = async () => getCurrentUserUseCase.invoke();

  getAllUsers = async () => getAllUsersUseCase.invoke();

  getUser = async (userId: string) => getUserUseCase.invoke(userId);

  addUser = async (payload: User) => addUserUseCase.invoke(payload);

  updateUser = async (payload: User) => updateUserUseCase.invoke(payload);
}
