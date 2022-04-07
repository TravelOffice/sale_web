import { leadPresenter } from '@adapter/presenters';
import { Lead } from '@domain/entities/Lead';
import { leadActions } from '@redux/slices/leadSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllLeads() {
  const leads : Lead[] = yield call(leadPresenter.getAllLeads);
  yield put(leadActions.setAllLeads(leads));
}

function* getLead(action: PayloadAction<any>) {
  const { payload } = action;
}

export default function* leadSaga() {
  yield all([
    takeLatest(leadActions.getAllLeads, getAllLeads),
    takeLatest(leadActions.getLead, getLead),
  ]);
}
