import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../types/company.types';

interface CompanyState {
  singleCompany: Company | null;
  companies: Company[];
  searchCompanyByText: string;
}

const initialState: CompanyState = {
  singleCompany: null,
  companies: [],
  searchCompanyByText: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setSingleCompany: (state, action: PayloadAction<Company | null>) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action: PayloadAction<string>) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;