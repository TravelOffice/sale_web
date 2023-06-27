import { CreateDepartureTourFormData, DepartureTour } from '@domain/entities/tour';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TourState {
  createDepartureTourLoading: boolean;
}

const initialState: TourState = {
  createDepartureTourLoading: false,
};

const tourSlice = createSlice({
  name: 'Tour',
  initialState,
  reducers: {
    createDepartureTour: (state, _action: PayloadAction<CreateDepartureTourFormData>) => {
      state.createDepartureTourLoading = true;
    },
    onDepartureTourCreated: (state, _action: PayloadAction<DepartureTour>) => {
      state.createDepartureTourLoading = false;
    },
    onDepartureTourCreatedError: (state) => {
      state.createDepartureTourLoading = false;
    },
  },
});

// Actions
export const tourActions = tourSlice.actions;

// Reducers
export const tourReducers = tourSlice.reducer;

export default { tourActions, tourReducers };
