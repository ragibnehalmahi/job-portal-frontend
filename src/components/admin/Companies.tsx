import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '../../redux/companySlice';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';

const Companies: React.FC = () => {
  useGetAllCompanies();
  const [input, setInput] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;