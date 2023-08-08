/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

interface PaymentVoucherState {
  currentPaymentVoucher?: PaymentVoucher,
  openUpdateModal: boolean,
  updatePaymentVoucherLoading: boolean,
}

const initialState: PaymentVoucherState = {
  openUpdateModal: false,
  updatePaymentVoucherLoading: false,
};

const paymentVoucherSlice = createSlice({
  name: 'paymentVoucher',
  initialState,
  reducers: {
    setSelectedPaymentVoucher: (state, action: PayloadAction<PaymentVoucher>) => {
      state.currentPaymentVoucher = action.payload;
      state.openUpdateModal = true;
    },
    unSelectPaymentVoucher: (state) => {
      state.openUpdateModal = false;
      state.currentPaymentVoucher = undefined;
    },
  },
});

// Actions
export const paymentVoucherActions = paymentVoucherSlice.actions;

// Reducers
export const paymentVoucherReducers = paymentVoucherSlice.reducer;

export default { paymentVoucherActions, paymentVoucherReducers };
