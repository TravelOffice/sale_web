import { customerPresenter } from '@adapter/presenters';
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
    // Re-fetch all customers
    const customers: Customer[] = yield call(customerPresenter.getAllCustomers);
    yield put(customerActions.setAllCustomers(customers));
  } catch (error: any) {
    yield put(customerActions.setAddedCustomerError(error.message));
  }
}

function* updateCustomer(action: PayloadAction<Customer>) {
  try {
    const customer: Customer = action.payload;
    const updatedCustomer: Customer = yield call(customerPresenter.updateCustomer, customer);
    yield put(customerActions.setUpdatedCustomer(updatedCustomer));
    // Re-fetch all customers
    const customers: Customer[] = yield call(customerPresenter.getAllCustomers);
    yield put(customerActions.setAllCustomers(customers));
  } catch (error: any) {
    yield put(customerActions.setUpdatedCustomerError(error.message));
  }
}

export default function* customerSaga() {
  yield all([
    takeLatest(customerActions.getAllCustomers, getAllCustomers),
    takeLatest(customerActions.addCustomer, addCustomer),
    takeLatest(customerActions.updateCustomer, updateCustomer),
  ]);
}
