import { userPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import {
  User,
} from '@domain/entities/User';
import { userActions } from '@redux/slices/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllUsers() {
  try {
    const users : User[] = yield call(userPresenter.getAllUsers);
    yield put(userActions.setAllUsers(users));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(userActions.setFetchAllUserError());
  }
}

function* getUser(action: PayloadAction<string>) {
  const userId: string = action.payload;
  try {
    const user : User = yield call(userPresenter.getUser, userId);
    yield put(userActions.selectUser(user));
  } catch (error: any) {
    yield put(userActions.selectUser(undefined));
  }
}

function* addUser(action: PayloadAction<User>) {
  try {
    const user: User = action.payload;
    const addedUser : User = yield call(userPresenter.addUser, user);
    yield put(userActions.onUserAdded(addedUser));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('USER.ADD_USER_SUCCESSFULLY', { userName: addedUser.username }),
    });
    // Re-fetch all users
    const users : User[] = yield call(userPresenter.getAllUsers);
    yield put(userActions.setAllUsers(users));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(userActions.onUserAddedError());
  }
}

function* updateUser(action: PayloadAction<User>) {
  try {
    const user: User = action.payload;
    const updatedUser : User = yield call(userPresenter.updateUser, user);
    yield put(userActions.onUserUpdated(updatedUser));
    yield put(userActions.setSelectedUser(updatedUser));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('USER.UPDATE_USER_SUCCESSFULLY', { userName: updatedUser.username }),
    });
    // Re-fetch all users
    const users : User[] = yield call(userPresenter.getAllUsers);
    yield put(userActions.setAllUsers(users));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(userActions.onUserUpdatedError());
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActions.getAllUsers, getAllUsers),
    takeLatest(userActions.getUser, getUser),
    takeLatest(userActions.addUser, addUser),
    takeLatest(userActions.updateUser, updateUser),
  ]);
}
