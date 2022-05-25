import { opportunityPresenter } from '@adapter/presenters';
import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';

function* getAllOpportunities(action: PayloadAction<FilterAttributesOpportunity>) {
  try {
    const opps: Opportunity[] = yield call(
      opportunityPresenter.getAllOpportunities,
      action.payload,
    );
    yield put(opportunityActions.onGetAllOpportunitiesFinished(opps));
  } catch (error: any) {
    yield put(opportunityActions.onActionError(error.message));
  }
}

function* getOpportunitiesByLead(
  action: PayloadAction<FilterAttributesOpportunity>,
) {
  try {
    const opportunities: Opportunity[] = yield call(
      opportunityPresenter.getOpportunitiesByLead,
      action.payload,
    );
    yield put(opportunityActions.onGetAllOpportunitiesFinished(opportunities));
  } catch (error: any) {
    yield put(opportunityActions.onActionError(error.message));
  }
}

function* deleteOpportunity(action: PayloadAction<Opportunity>) {
  try {
    const oppId = action.payload.id;
    yield call(
      opportunityPresenter.deleteOpportunity,
      oppId,
    );
    yield put(opportunityActions.onDeleteOpportunityFinished(action.payload));
  } catch (error: any) {
    yield put(opportunityActions.onActionError(error.message));
  }
}

function* createOpportunity(action: PayloadAction<Opportunity>) {
  try {
    const { payload } = action;
    const opportunity: Opportunity = yield call(opportunityPresenter.createOpportunity, payload);
    yield put(opportunityActions.onOpportunityCreated(opportunity));
    toasty.show({
      type: 'success',
      title: i18n.t('COMMON.SUCCESS'),
      message: i18n.t('OPP.CREATE_OPPORTUNITY_SUCCESSFULLY', { name: opportunity.name }),
    });
  } catch (error: any) {
    yield put(opportunityActions.onCreateOpportunityError(error.message));
    toasty.show({
      type: 'error',
      title: i18n.t('COMMON.ERROR'),
      message: `${error.message}`,
    });
  }
}

function* updateOpportunity(action: PayloadAction<Opportunity>) {
  try {
    const { payload } = action;
    const opportunity: Opportunity = yield call(opportunityPresenter.updateOpportunity, payload);
    yield put(opportunityActions.onOpportunityUpdated(opportunity));
    toasty.show({
      type: 'success',
      title: i18n.t('COMMON.SUCCESS'),
      message: i18n.t('OPP.UPDATE_OPPORTUNITY_SUCCESSFULLY', { name: opportunity.name }),
    });
  } catch (error: any) {
    yield put(opportunityActions.onUpdateOpportunityError(error.message));
    toasty.show({
      type: 'error',
      title: i18n.t('COMMON.ERROR'),
      message: `${error.message}`,
    });
  }
}

function* selectOpportunity(action: PayloadAction<Opportunity | [string, string]>) {
  try {
    const { payload } = action;
    if (!Array.isArray(payload)) return;
    const [leadId, oppId] = payload;
    const opportunity: Opportunity = yield call(opportunityPresenter.getOpportunity, leadId, oppId);
    yield put(opportunityActions.onOpportunitySelected(opportunity));
  } catch (error: any) {
    toasty.show({
      type: 'error',
      title: i18n.t('COMMON.ERROR'),
      message: `${error.message}`,
    });
  }
}

export default function* opportunitySaga() {
  yield all([
    takeLatest(opportunityActions.getAllOpportunities, getAllOpportunities),
    takeLatest(opportunityActions.getOpportunitiesByLead, getOpportunitiesByLead),
    takeLatest(opportunityActions.deleteOpportunity, deleteOpportunity),
    takeLatest(opportunityActions.selectOpportunity, selectOpportunity),
    takeEvery(opportunityActions.createOpportunity, createOpportunity),
    takeEvery(opportunityActions.updateOpportunity, updateOpportunity),
  ]);
}
