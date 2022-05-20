/* eslint-disable no-unused-vars */
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { CreateUpdateOpportunityResponse, FetchOpportunityResponse, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import removeElement from '@utils/ArrayUtils';
import { HandleDataState } from './others/HandleDataState';

interface OpportunityState {
  data: Opportunity[],
  total: number,
  allOpportunities: Opportunity[],
  selectedOpportunity?: Opportunity,
  addedOpportunityResponse: CreateUpdateOpportunityResponse | null,
  updatedOpportunityResponse: CreateUpdateOpportunityResponse | null,
  actionState: HandleDataState,
  actionErrorMessage?: string,
  createOrUpdateOpportunityLoading: boolean,
  openSidebar: boolean,
}

const initialState: OpportunityState = {
  data: [],
  total: 1,
  allOpportunities: [],
  selectedOpportunity: undefined,
  addedOpportunityResponse: null,
  updatedOpportunityResponse: null,
  actionState: 'init',
  actionErrorMessage: undefined,
  createOrUpdateOpportunityLoading: false,
  openSidebar: false,
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
    deleteOpportunity: (state, action: PayloadAction<Opportunity>) => { },
    onGetAllOpportunitiesFinished: (state, action: PayloadAction<Opportunity[]>) => {
      state.actionState = 'finished';
      state.allOpportunities = action.payload;
    },
    onDeleteOpportunityFinished: (state, action: PayloadAction<Opportunity>) => {
      const oppId = action.payload.id;
      state.allOpportunities = removeElement<Opportunity>(
        state.allOpportunities, (opp) => opp.id !== oppId,
      );
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('OPP.DELETE_OPPORTUNITY_SUCCESS'),
      });
    },
    onActionError: (state, action: PayloadAction<string>) => {
      state.actionState = 'error';
      state.actionErrorMessage = action.payload;
    },
    createOpportunity: (state, _action: PayloadAction<Partial<Opportunity>>) => {
      state.createOrUpdateOpportunityLoading = true;
    },
    onOpportunityCreated: (state, action: PayloadAction<Opportunity>) => {
      state.createOrUpdateOpportunityLoading = false;
      state.openSidebar = false;
      state.allOpportunities.push(action.payload);
    },
    onCreateOpportunityError: (state, action: PayloadAction<string>) => {
      state.createOrUpdateOpportunityLoading = false;
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
  },
});

// Actions
export const opportunityActions = opportunitySlice.actions;

// Reducers
export const opportunityReducers = opportunitySlice.reducer;

export default { opportunityActions, opportunityReducers };
