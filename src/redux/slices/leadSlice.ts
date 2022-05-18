/* eslint-disable no-unused-vars */
import {
  FetchAssignedLeadResponse as FetchLeadsResponse, CreateUpdateLeadResponse, Lead, LeadStatusType,
} from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface LeadState {
  data: Lead[],
  total: number,
  allLeads: Lead[],
  selectedLead?: Lead,
  addedLeadResponse: CreateUpdateLeadResponse | null,
  updatedLeadResponse: CreateUpdateLeadResponse | null,
  addLeadState: HandleDataState,
  updateLeadState: HandleDataState,
  fetchAllLeadsError?: FetchLeadsResponse,
  fetchAllLeadsState: HandleDataState,
}

const initialState : LeadState = {
  data: [],
  total: 1,
  allLeads: [],
  selectedLead: undefined,
  addedLeadResponse: null,
  updatedLeadResponse: null,
  addLeadState: 'init',
  updateLeadState: 'init',
  fetchAllLeadsState: 'init',
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    getAllLeads: (state, action: PayloadAction<LeadStatusType>) => {
      state.fetchAllLeadsState = 'loading';
      state.fetchAllLeadsError = undefined;
    },
    getLead: (state, action: PayloadAction<any>) => {},
    setAllLeads: (state, action: PayloadAction<Lead[]>) => {
      state.fetchAllLeadsState = 'finished';
      state.allLeads = action.payload;
    },
    initAddLeadForm: (state) => {
      state.addLeadState = 'init';
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.addLeadState = 'loading';
    },
    setFetchAllLeadError: (state) => {
      state.fetchAllLeadsState = 'error';
    },
    setAddedLead: (state, action: PayloadAction<Lead>) => {
      state.addLeadState = 'finished';
      state.addedLeadResponse = { lead: action.payload };
    },
    setAddedLeadError: (state) => {
      state.addLeadState = 'error';
    },
    initUpdateLeadForm: (state) => {
      state.updateLeadState = 'init';
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      state.updateLeadState = 'loading';
    },
    setUpdatedLead: (state, action: PayloadAction<Lead>) => {
      state.updateLeadState = 'finished';
      state.updatedLeadResponse = { lead: action.payload };
    },
    setUpdatedLeadError: (state) => {
      state.updateLeadState = 'error';
    },
    deleteLead: (state, action: PayloadAction<Lead>) => {},
    selectLead: (state, action: PayloadAction<Lead>) => {
      state.selectedLead = action.payload;
    },
    unSelectLead: (state) => {
      state.selectedLead = undefined;
    },
  },
});

// Actions
export const leadActions = leadSlice.actions;

// Reducers
export const leadReducers = leadSlice.reducer;

export default { leadActions, leadReducers };
