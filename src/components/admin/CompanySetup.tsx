import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import useGetCompanyById from '../../hooks/useGetCompanyById';
import { setSingleCompany } from '../../redux/companySlice';
import axios from '../../utils/axiosInstance';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface CompanyForm {
  name: string;
  description: string;
  website: string;
  location: string;
  file: File | null;
}

const CompanySetup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  useGetCompanyById(id!);
  const { singleCompany } = useAppSelector((state) => state.company);
  const [input, setInput] = useState<CompanyForm>({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        file: null,
      });
    }
  }, [singleCompany]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInput({ ...input, file });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) formData.append('file', input.file);

    try {
      setLoading(true);
      const res = await axios.put(`/company/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input name="name" value={input.name} onChange={changeHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input name="website" value={input.website} onChange={changeHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={fileChangeHandler} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;