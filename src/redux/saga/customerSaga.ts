import { customerPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Customer, CustomerStatusType } from '@domain/entities/Lead';
import { customerActions } from '@redux/slices/customerSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllCustomers(action: PayloadAction<CustomerStatusType>) {
  const customers: Customer[] = yield call(customerPresenter.getAllCustomers, action.payload);
  yield put(customerActions.setAllCustomers(customers));
}

function* addCustomer(action: PayloadAction<Customer>) {
  try {
    const customer: Customer = action.payload;
    const addedCustomer: Customer = yield call(customerPresenter.addCustomer, customer);
    yield put(customerActions.setAddedCustomer(addedCustomer));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('CUSTOMER.ADD_CUSTOMER_SUCCESSFULLY', { customerName: addedCustomer.name }),
    });
    // Re-fetch all customers
    const customers: Customer[] = yield call(customerPresenter.getAllCustomers);
    yield put(customerActions.setAllCustomers(customers));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(customerActions.setAddedCustomerError());
  }
}

function* updateCustomer(action: PayloadAction<Customer>) {
  try {
    const customer: Customer = action.payload;
    const updatedCustomer: Customer = yield call(customerPresenter.updateCustomer, customer);
    yield put(customerActions.setUpdatedCustomer(updatedCustomer));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('CUSTOMER.EDIT_CUSTOMER_SUCCESSFULLY', { customerName: updatedCustomer.name }),
    });
    // Re-fetch all customers
    const customers: Customer[] = yield call(customerPresenter.getAllCustomers);
    yield put(customerActions.setAllCustomers(customers));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(customerActions.setUpdatedCustomerError());
  }
}

export default function* customerSaga() {
  yield all([
    takeLatest(customerActions.getAllCustomers, getAllCustomers),
    takeLatest(customerActions.addCustomer, addCustomer),
    takeLatest(customerActions.updateCustomer, updateCustomer),
  ]);
}
