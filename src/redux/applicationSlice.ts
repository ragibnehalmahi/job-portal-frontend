import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../types/job.types';

interface ApplicationState {
  applicants: Job | null; // job with populated applications
}

const initialState: ApplicationState = {
  applicants: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllApplicants: (state, action: PayloadAction<Job | null>) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;