import { leadPresenter } from '@adapter/presenters';
import { Lead } from '@domain/entities/Lead';
import { leadActions } from '@redux/slices/leadSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllLeads() {
  try {
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    yield put(leadActions.setFetchAllLeadError(error.message));
  }
}

function* addLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const addedLead : Lead = yield call(leadPresenter.addLead, lead);
    yield put(leadActions.setAddedLead(addedLead));
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    yield put(leadActions.setAddedLeadError(error.message));
  }
}

function* updateLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const updatedLead : Lead = yield call(leadPresenter.updateLead, lead);
    yield put(leadActions.setUpdatedLead(updatedLead));
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    yield put(leadActions.setUpdatedLeadError(error.message));
  }
}

export default function* leadSaga() {
  yield all([
    takeLatest(leadActions.getAllLeads, getAllLeads),
    takeLatest(leadActions.addLead, addLead),
    takeLatest(leadActions.updateLead, updateLead),
  ]);
}
