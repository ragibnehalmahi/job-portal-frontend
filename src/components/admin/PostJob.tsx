import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppSelector } from '../../hooks/useTypedSelector';
import axios from '../../utils/axiosInstance';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';

interface JobForm {
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
  jobType: string;
  experience: string;
  position: number;
  companyId: string;
}

const PostJob: React.FC = () => {
  const { companies } = useAppSelector((state) => state.company);
  const [input, setInput] = useState<JobForm>({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value: string) => {
    const selected = companies.find((c) => c.name.toLowerCase() === value);
    if (selected) setInput({ ...input, companyId: selected._id });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error('Please select a company');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('/job/post', input);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeHandler} />
            </div>
            <div>
              <Label>Requirements (comma separated)</Label>
              <Input name="requirements" value={input.requirements} onChange={changeHandler} />
            </div>
            <div>
              <Label>Salary (LPA)</Label>
              <Input name="salary" value={input.salary} onChange={changeHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeHandler} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeHandler} />
            </div>
            <div>
              <Label>Experience (years)</Label>
              <Input name="experience" value={input.experience} onChange={changeHandler} />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeHandler}
              />
            </div>
            {companies.length > 0 && (
              <div>
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((comp) => (
                        <SelectItem key={comp._id} value={comp.name.toLowerCase()}>
                          {comp.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;