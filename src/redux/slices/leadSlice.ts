/* eslint-disable no-unused-vars */
import {
  FetchAssignedLeadResponse as FetchLeadsResponse,
  Lead, LeadStatusType, Task, TaskSearchParams,
} from '@domain/entities/Lead';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface LeadState {
  data: Lead[],
  total: number,
  allLeads: Lead[],
  allTasks: Task[],
  selectedLead?: Lead,
  selectedTask?: Task,
  fetchAllLeadsError?: FetchLeadsResponse,
  fetchAllLeadsState: HandleDataState,
  openSidebar: boolean,
  createOrUpdateLeadLoading: boolean,
}

const initialState : LeadState = {
  data: [],
  total: 1,
  allLeads: [],
  allTasks: [],
  selectedLead: undefined,
  selectedTask: undefined,
  fetchAllLeadsState: 'init',
  openSidebar: false,
  createOrUpdateLeadLoading: false,
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    // Get all Leads and related actions
    getAllLeads: (state, _action: PayloadAction<LeadStatusType>) => {
      state.fetchAllLeadsState = 'loading';
      state.fetchAllLeadsError = undefined;
    },
    setAllLeads: (state, action: PayloadAction<Lead[]>) => {
      state.fetchAllLeadsState = 'finished';
      state.allLeads = action.payload;
    },
    setFetchAllLeadError: (state) => {
      state.fetchAllLeadsState = 'error';
    },
    getLead: (state, _action: PayloadAction<string>) => {
    },
    addLead: (state, _action: PayloadAction<Lead>) => {
      state.createOrUpdateLeadLoading = true;
    },
    onLeadAdded: (state, _action: PayloadAction<Lead>) => {
      state.createOrUpdateLeadLoading = false;
      state.openSidebar = false;
    },
    updateLead: (state, _action: PayloadAction<Lead>) => {
      state.createOrUpdateLeadLoading = true;
    },
    onLeadUpdated: (state, _action: PayloadAction<Lead>) => {
      state.createOrUpdateLeadLoading = false;
      state.openSidebar = false;
    },
    deleteLead: (state, _action: PayloadAction<Lead>) => {},
    selectLead: (state, action: PayloadAction<Lead>) => {
      state.selectedLead = action.payload;
      state.openSidebar = true;
      state.createOrUpdateLeadLoading = false;
    },
    unSelectLead: (state) => {
      state.selectedLead = undefined;
      state.openSidebar = false;
    },
    getAllTasks: (state, _action: PayloadAction<TaskSearchParams>) => {
    },
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.allTasks = action.payload;
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
    updateTask: (state, _action: PayloadAction<Task>) => {},
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    resetSidebar: (state) => {
      state.openSidebar = false;
      state.createOrUpdateLeadLoading = false;
      state.selectedLead = undefined;
    },
  },
});

// Actions
export const leadActions = leadSlice.actions;

// Reducers
export const leadReducers = leadSlice.reducer;

export default { leadActions, leadReducers };
