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

function* addLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const leadAdded : Lead = yield call(leadPresenter.addLead, lead);
    yield put(leadActions.setAddedLead(leadAdded));
  } catch (error: any) {
    yield put(leadActions.setAddedLeadError(error.message));
  }
}

function* updateLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const leadAdded : Lead = yield call(leadPresenter.updateLead, lead);
    yield put(leadActions.setUpdatedLead(leadAdded));
  } catch (error: any) {
    yield put(leadActions.setUpdatedLead(error.message));
  }
}

function* getLead(action: PayloadAction<any>) {
  const { payload } = action;
}

export default function* leadSaga() {
  yield all([
    takeLatest(leadActions.getAllLeads, getAllLeads),
    takeLatest(leadActions.getLead, getLead),
    takeLatest(leadActions.addLead, addLead),
    takeLatest(leadActions.updateLead, updateLead),
  ]);
}
