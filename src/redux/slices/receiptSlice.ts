import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Receipt } from '@domain/entities/receipt/Receipt';

interface ReceiptState {
  selectedReceipt?: Receipt,
  openSidebar: boolean,
  openDeleteDialog: boolean,
}

const initialState : ReceiptState = {
  openSidebar: false,
  openDeleteDialog: false,
};

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    selectReceipt: (state, action: PayloadAction<Receipt | undefined>) => {
      state.selectedReceipt = action.payload;
    },
    setSelectedReceipt: (state, action: PayloadAction<Receipt>) => {
      state.selectedReceipt = action.payload;
    },
    unSelectReceipt: (state) => {
      state.selectedReceipt = undefined;
      state.openSidebar = false;
      state.openDeleteDialog = false;
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    setOpenDeleteDialog: (state, action: PayloadAction<boolean>) => {
      state.openDeleteDialog = action.payload;
    },
  },
});

// Actions
export const receiptActions = receiptSlice.actions;

// Reducers
export const receiptReducers = receiptSlice.reducer;

export default { receiptActions, receiptReducers };
