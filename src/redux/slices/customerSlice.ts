/* eslint-disable no-unused-vars */
import {
  Customer, CustomerStatusType, FetchAssignedCustomerResponse,
} from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HandleDataState = 'init' | 'loading' | 'finished' | 'error';

interface CustomerState {
  data: Customer[]
  total: number,
  allCustomers: Customer[],
  selectedCustomer?: Customer,
  fetchAllCustomersError?: FetchAssignedCustomerResponse,
  fetchAllCustomersState: HandleDataState,
  openSidebar: boolean,
  createOrUpdateCustomerLoading: boolean,
}

const initialState: CustomerState = {
  data: [],
  total: 1,
  allCustomers: [],
  selectedCustomer: undefined,
  fetchAllCustomersState: 'init',
  openSidebar: false,
  createOrUpdateCustomerLoading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Get all customers and related actions
    getAllCustomers: (state, _action: PayloadAction<CustomerStatusType>) => {
      state.fetchAllCustomersState = 'loading';
      state.fetchAllCustomersError = undefined;
    },
    getCustomer: (state, _action: PayloadAction<any>) => { },
    setAllCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.fetchAllCustomersState = 'finished';
      state.allCustomers = action.payload;
    },
    setFetchAllCustomerError: (state, _action: PayloadAction<string>) => {
      state.fetchAllCustomersState = 'error';
    },

    // Add new customer and related actions
    addCustomer: (state, _action: PayloadAction<Customer>) => {
      state.createOrUpdateCustomerLoading = true;
    },
    onCustomerAdded: (state, _action: PayloadAction<Customer>) => {
      state.createOrUpdateCustomerLoading = false;
      state.openSidebar = false;
    },

    // Update customer and related actions
    updateCustomer: (state, _action: PayloadAction<Customer>) => {
      state.createOrUpdateCustomerLoading = true;
    },
    onCustomerUpdated: (state, _action: PayloadAction<Customer>) => {
      state.createOrUpdateCustomerLoading = false;
      state.openSidebar = false;
    },

    // Delete customer and related actions
    deleteCustomer: (state, _action: PayloadAction<Customer>) => { },

    // Actions relate sidebar
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload;
      state.openSidebar = true;
      state.createOrUpdateCustomerLoading = false;
    },
    unSelectCustomer: (state) => {
      state.selectedCustomer = undefined;
      state.openSidebar = false;
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    resetSidebar: (state) => {
      state.openSidebar = false;
      state.createOrUpdateCustomerLoading = false;
      state.selectedCustomer = undefined;
    },
  },
});

// Actions
export const customerActions = customerSlice.actions;

// Reducers
export const customerReducers = customerSlice.reducer;

export default { customerActions, customerReducers };
