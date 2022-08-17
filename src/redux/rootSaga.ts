import { takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authSaga from '@redux/saga/authSaga';
import chatSaga from '@redux/saga/chatSaga';
import pageConnectionSaga from '@redux/saga/pageConnectionSaga';
import leadSaga from '@redux/saga/leadSaga';
import opportunitySaga from '@redux/saga/opportunitySaga';
import notificationSaga from '@redux/saga/notificationSaga';
import customerSaga from './saga/customerSaga';
import userSaga from './saga/userSaga';

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
    leadSaga(),
    userSaga(),
    opportunitySaga(),
    pageConnectionSaga(),
    customerSaga(),
    notificationSaga(),
  ]);
}
