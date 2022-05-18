/* eslint-disable no-unused-vars */
import {
  CreateUpdateCustomerResponse, Customer, CustomerStatusType, FetchAssignedCustomerResponse,
} from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HandleDataState = 'init' | 'loading' | 'finished' | 'error';

interface CustomerState {
  data: Customer[]
  total: number,
  allCustomers: Customer[],
  selectedCustomer?: Customer,
  addedCustomerResponse: CreateUpdateCustomerResponse | null,
  updatedCustomerResponse: CreateUpdateCustomerResponse | null,
  addCustomerState: HandleDataState,
  updateCustomerState: HandleDataState,
  fetchAllCustomersError?: FetchAssignedCustomerResponse,
  fetchAllCustomersState: HandleDataState,
}

const initialState: CustomerState = {
  data: [],
  total: 1,
  allCustomers: [],
  selectedCustomer: undefined,
  addedCustomerResponse: null,
  updatedCustomerResponse: null,
  addCustomerState: 'init',
  updateCustomerState: 'init',
  fetchAllCustomersState: 'init',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getAllCustomers: (state, action: PayloadAction<CustomerStatusType>) => {
      state.fetchAllCustomersState = 'loading';
      state.fetchAllCustomersError = undefined;
    },
    getCustomer: (state, action: PayloadAction<any>) => { },
    setAllCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.fetchAllCustomersState = 'finished';
      state.allCustomers = action.payload;
    },
    initAddCustomerForm: (state) => {
      state.addCustomerState = 'init';
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.addCustomerState = 'loading';
    },
    setFetchAllCustomerError: (state, action: PayloadAction<string>) => {
      state.fetchAllCustomersState = 'error';
      state.fetchAllCustomersError = { errorMsg: action.payload };
    },
    setAddedCustomer: (state, action: PayloadAction<Customer>) => {
      state.addCustomerState = 'finished';
      state.addedCustomerResponse = { customer: action.payload };
    },
    setAddedCustomerError: (state, action: PayloadAction<string>) => {
      state.addCustomerState = 'error';
      state.addedCustomerResponse = { errorMsg: action.payload };
    },
    initUpdateCustomerForm: (state) => {
      state.updateCustomerState = 'init';
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      state.updateCustomerState = 'loading';
    },
    setUpdatedCustomer: (state, action: PayloadAction<Customer>) => {
      state.updateCustomerState = 'finished';
      state.updatedCustomerResponse = { customer: action.payload };
    },
    setUpdatedCustomerError: (state, action: PayloadAction<string>) => {
      state.updateCustomerState = 'error';
      state.updatedCustomerResponse = { errorMsg: action.payload };
    },
    deleteCustomer: (state, action: PayloadAction<Customer>) => { },
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload;
    },
    unSelectCustomer: (state) => {
      state.selectedCustomer = undefined;
    },
  },
});

// Actions
export const customerActions = customerSlice.actions;

// Reducers
export const customerReducers = customerSlice.reducer;

export default { customerActions, customerReducers };
