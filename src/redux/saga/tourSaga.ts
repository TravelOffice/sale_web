import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { DepartureTour } from '@domain/entities/tour';
import { tourActions } from '@redux/slices/tourSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* createDepartureTour(action: PayloadAction<DepartureTour>) {
  try {
    const departureTour = action.payload;
    const createdDepartureTour: DepartureTour = yield call(
      tourPresenter.createDepartureTour, departureTour,
    );
    yield put(tourActions.onDepartureTourCreated(createdDepartureTour));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('DEPARTURE_TOUR.CREATE_DEPARTURE_TOUR_SUCCESSFULLY', { roleName: createdDepartureTour.name }),
    });
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(tourActions.onDepartureTourCreatedError());
  }
}

export default function* rolePermissionSaga() {
  yield all([
    takeLatest(tourActions.createDepartureTour, createDepartureTour),
  ]);
}
