import { userPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import {
  User,
} from '@domain/entities/User';
import { userActions } from '@redux/slices/userSlice';
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

export default function* userSaga() {
  yield all([
    takeLatest(userActions.getAllUsers, getAllUsers),
  ]);
}
