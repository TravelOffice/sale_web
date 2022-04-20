import { CreateUpdateLeadResponse, Lead } from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeadState {
  data: Lead[]
  total: number,
  allLeads: Lead[],
  selectedLead?: Lead,
  addedLeadResponse: CreateUpdateLeadResponse | null,
  updatedLeadResponse: CreateUpdateLeadResponse | null,
  addLeadState: 'init' | 'loading' | 'finished' | 'error',
  updateLeadState: 'init' | 'loading' | 'finished' | 'error',
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
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    getAllLeads: (state) => {},
    getLead: (state, action: PayloadAction<any>) => {},
    setAllLeads: (state, action: PayloadAction<Lead[]>) => {
      state.allLeads = action.payload;
    },
    initAddLeadForm: (state) => {
      state.addLeadState = 'init';
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.addLeadState = 'loading';
    },
    setAddedLead: (state, action: PayloadAction<Lead>) => {
      state.addLeadState = 'finished';
      state.addedLeadResponse = { lead: action.payload };
    },
    setAddedLeadError: (state, action: PayloadAction<string>) => {
      state.addLeadState = 'error';
      state.addedLeadResponse = { errorMsg: action.payload };
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
    setUpdatedLeadError: (state, action: PayloadAction<string>) => {
      state.updateLeadState = 'error';
      state.updatedLeadResponse = { errorMsg: action.payload };
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
