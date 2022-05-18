/* eslint-disable no-unused-vars */
import { CreateUpdateOpportunityResponse, FetchOpportunityResponse, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface Opportunitiestate {
  data: Opportunity[],
  total: number,
  allOpportunities: Opportunity[],
  selectedOpportunity?: Opportunity,
  addedOpportunityResponse: CreateUpdateOpportunityResponse | null,
  updatedOpportunityResponse: CreateUpdateOpportunityResponse | null,
  actionState: HandleDataState,
  actionErrorMessage?: string,
}

const initialState: Opportunitiestate = {
  data: [],
  total: 1,
  allOpportunities: [],
  selectedOpportunity: undefined,
  addedOpportunityResponse: null,
  updatedOpportunityResponse: null,
  actionState: 'init',
  actionErrorMessage: undefined,
};

const opportunitySlice = createSlice({
  name: 'Opportunity',
  initialState,
  reducers: {
    getAllOpportunities: (state) => {
      state.actionState = 'loading';
      state.actionErrorMessage = undefined;
    },
    getOpportunitiesByLead: (state, action: PayloadAction<string>) => {
      state.actionState = 'loading';
      state.actionErrorMessage = undefined;
    },
    getOpportunity: (state, action: PayloadAction<any>) => { },
    selectOpportunity: (state, action: PayloadAction<Opportunity>) => {
      state.selectedOpportunity = action.payload;
    },
    onGetAllOpportunitiesFinished: (state, action: PayloadAction<Opportunity[]>) => {
      state.actionState = 'finished';
      state.allOpportunities = action.payload;
    },
    onActionError: (state, action: PayloadAction<string>) => {
      state.actionState = 'error';
      state.actionErrorMessage = action.payload;
    },
  },
});

// Actions
export const opportunityActions = opportunitySlice.actions;

// Reducers
export const opportunityReducers = opportunitySlice.reducer;

export default { opportunityActions, opportunityReducers };
