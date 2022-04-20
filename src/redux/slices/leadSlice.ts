import { Lead } from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeadState {
  data: Lead[],
  total: number,
  params: any,
  allLeads: Lead[],
  selectedLead?: any
}

const initialState : LeadState = {
  data: [],
  total: 1,
  params: {},
  allLeads: [],
  selectedLead: null,
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    getAllLeads: (state) => {
    },
    getLead: (state, action: PayloadAction<any>) => {

    },
    setAllLeads: (state, action: PayloadAction<any>) => {
      state.allLeads = action.payload;
    },
    addLead: (state, action: PayloadAction<any>) => {

    },
    deleteLead: (state, action: PayloadAction<any>) => {

    },
  },
});

// Actions
export const leadActions = leadSlice.actions;

// Reducers
export const leadReducers = leadSlice.reducer;

export default { leadActions, leadReducers };
