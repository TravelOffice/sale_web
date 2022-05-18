import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Lead, LeadStatusType } from '@domain/entities/Lead';
import { leadActions } from '@redux/slices/leadSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllLeads(action: PayloadAction<LeadStatusType>) {
  try {
    const leads : Lead[] = yield call(leadPresenter.getAllLeads, action.payload);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(leadActions.setFetchAllLeadError());
  }
}

function* addLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const addedLead : Lead = yield call(leadPresenter.addLead, lead);
    yield put(leadActions.setAddedLead(addedLead));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('LEAD.ADD_LEAD_SUCCESSFULLY', { leadName: addedLead.name }),
    });
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(leadActions.setAddedLeadError());
  }
}

function* updateLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const updatedLead : Lead = yield call(leadPresenter.updateLead, lead);
    yield put(leadActions.setUpdatedLead(updatedLead));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('LEAD.EDIT_LEAD_SUCCESSFULLY', { leadName: updatedLead.name }),
    });
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(leadActions.setUpdatedLeadError());
  }
}

export default function* leadSaga() {
  yield all([
    takeLatest(leadActions.getAllLeads, getAllLeads),
    takeLatest(leadActions.addLead, addLead),
    takeLatest(leadActions.updateLead, updateLead),
  ]);
}
