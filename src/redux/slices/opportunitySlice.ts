/* eslint-disable no-unused-vars */
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import {
  CreateUpdateOpportunityResponse,
  FilterAttributesOpportunity,
  Opportunity,
  OpportunityTask,
  OpportunityTaskSearchParams,
} from '@domain/entities/opportunity/Opportunity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import removeElement from '@utils/ArrayUtils';
import { HandleDataState } from './others/HandleDataState';

interface OpportunityState {
  data: Opportunity[],
  total: number,
  allOpportunities: Opportunity[],
  selectedOpportunity?: Opportunity,
  allTasks: OpportunityTask[],
  selectedTask?: OpportunityTask,
  actionState: HandleDataState,
  actionErrorMessage?: string,
  getOpportunityLoading: boolean,
  createOrUpdateOpportunityLoading: boolean,
  openSidebar: boolean,
}

const initialState: OpportunityState = {
  data: [],
  total: 1,
  allOpportunities: [],
  selectedOpportunity: undefined,
  allTasks: [],
  selectedTask: undefined,
  actionState: 'init',
  actionErrorMessage: undefined,
  getOpportunityLoading: false,
  createOrUpdateOpportunityLoading: false,
  openSidebar: false,
};

const opportunitySlice = createSlice({
  name: 'Opportunity',
  initialState,
  reducers: {
    getAllOpportunities: (state, action: PayloadAction<FilterAttributesOpportunity>) => {
      state.actionState = 'loading';
      state.actionErrorMessage = undefined;
    },
    getOpportunitiesByLead: (
      state, action: PayloadAction<FilterAttributesOpportunity>,
    ) => {
      state.actionState = 'loading';
      state.actionErrorMessage = undefined;
    },
    getOpportunity: (state, action: PayloadAction<any>) => { },
    selectOpportunity: (state, action: PayloadAction<Opportunity>) => {
      state.selectedOpportunity = action.payload;
      state.openSidebar = true;
    },
    onGoToOpportunityDetail: (state, action: PayloadAction<Opportunity | [string, string]>) => {
      if (Array.isArray(action.payload)) {
        state.getOpportunityLoading = true;
      } else {
        state.selectedOpportunity = action.payload;
      }
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
    updateOpportunity: (state, action: PayloadAction<Opportunity>) => {
      state.createOrUpdateOpportunityLoading = true;
    },
    onOpportunityUpdated: (state, action: PayloadAction<Opportunity>) => {
      state.createOrUpdateOpportunityLoading = false;
      state.openSidebar = false;
      const index = state.allOpportunities.findIndex((opp) => opp.id === action.payload.id);
      if (index >= 0) {
        state.allOpportunities[index] = action.payload;
      }
    },
    onUpdateOpportunityError: (state, action: PayloadAction<string>) => {
      state.createOrUpdateOpportunityLoading = false;
    },
    onOpportunitySelected: (state, action: PayloadAction<Opportunity>) => {
      state.selectedOpportunity = action.payload;
      state.getOpportunityLoading = false;
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.selectedOpportunity = undefined;
      state.openSidebar = action.payload;
    },
    getAllTasks: (state, action: PayloadAction<OpportunityTaskSearchParams>) => {
    },
    setAllTasks: (state, action: PayloadAction<OpportunityTask[]>) => {
      state.allTasks = action.payload;
    },
    selectTask: (state, action: PayloadAction<OpportunityTask>) => {
      state.selectedTask = action.payload;
    },
    updateTask: (state, action: PayloadAction<OpportunityTask>) => { },
  },
});

// Actions
export const opportunityActions = opportunitySlice.actions;

// Reducers
export const opportunityReducers = opportunitySlice.reducer;

export default { opportunityActions, opportunityReducers };
