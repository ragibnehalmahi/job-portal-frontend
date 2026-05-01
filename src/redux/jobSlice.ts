import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../types/job.types';
import { Application } from '../types/application.types';

interface JobState {
  allJobs: Job[];
  allAdminJobs: Job[];
  singleJob: Job | null;
  searchJobByText: string;
  allAppliedJobs: Application[];
  searchedQuery: string;
}

const initialState: JobState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: '',
  allAppliedJobs: [],
  searchedQuery: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action: PayloadAction<Job | null>) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action: PayloadAction<Job[]>) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action: PayloadAction<string>) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action: PayloadAction<Application[]>) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action: PayloadAction<string>) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;