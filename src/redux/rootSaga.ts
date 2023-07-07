import { takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authSaga from '@redux/saga/authSaga';
import chatSaga from '@redux/saga/chatSaga';
import pageConnectionSaga from '@redux/saga/pageConnectionSaga';
import notificationSaga from '@redux/saga/notificationSaga';
import mailSaga from '@redux/saga/mailSaga';
import userSaga from './saga/userSaga';
import rolePermissionSaga from './saga/rolePermission';
import tourSaga from './saga/tourSaga';

// eslint-disable-next-line require-yield
function* log(action: PayloadAction) {
  // eslint-disable-next-line no-console
  console.log('action', action);
}

function* loggerSaga() {
  yield takeEvery('*', log);
}

export default function* rootSaga() {
  yield all([
    loggerSaga(),
    authSaga(),
    chatSaga(),
    userSaga(),
    pageConnectionSaga(),
    notificationSaga(),
    rolePermissionSaga(),
    mailSaga(),
    tourSaga(),
  ]);
}
