import { opportunityPresenter } from '@adapter/presenters';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllOpportunities() {
  try {
    const opps : Opportunity[] = yield call(opportunityPresenter.getAllOpportunities);
    yield put(opportunityActions.onGetAllAllOpportunitiesFinished(opps));
  } catch (error: any) {
    yield put(opportunityActions.onActionError(error.message));
  }
}

export default function* opportunitySaga() {
  yield all([
    takeLatest(opportunityActions.getAllOpportunities, getAllOpportunities),
  ]);
}
