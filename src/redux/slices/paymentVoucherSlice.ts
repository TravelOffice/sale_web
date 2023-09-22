/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

interface PaymentVoucherState {
  currentPaymentVoucher?: PaymentVoucher,
  openUpdateModal: boolean,
  openApproveModal: boolean,
  updatePaymentVoucherLoading: boolean,
  approvePaymentVoucherLoading: boolean,
}

const initialState: PaymentVoucherState = {
  openUpdateModal: false,
  openApproveModal: false,
  updatePaymentVoucherLoading: false,
  approvePaymentVoucherLoading: false,
};

const paymentVoucherSlice = createSlice({
  name: 'paymentVoucher',
  initialState,
  reducers: {
    setSelectedPaymentVoucher: (state, action: PayloadAction<PaymentVoucher>) => {
      state.currentPaymentVoucher = action.payload;
    },
    unSelectPaymentVoucher: (state) => {
      state.currentPaymentVoucher = undefined;
    },
    setOpenUpdateModal: (state, action: PayloadAction<boolean>) => {
      state.openUpdateModal = action.payload;
    },
    setOpenApproveModal: (state, action: PayloadAction<boolean>) => {
      state.openApproveModal = action.payload;
    },
  },
});

// Actions
export const paymentVoucherActions = paymentVoucherSlice.actions;

// Reducers
export const paymentVoucherReducers = paymentVoucherSlice.reducer;

export default { paymentVoucherActions, paymentVoucherReducers };
