import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Job as JobType } from '../types/job.types';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const Job: React.FC<{ job: JobType }> = React.memo(({ job }) => {
  const navigate = useNavigate();
  const daysAgo = (date: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? 'Today' : `${diff} days ago`;
  };
  const company = typeof job.company !== 'string' ? job.company : null;

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar><AvatarImage src={company?.logo} /></Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{company?.name}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description.substring(0, 100)}...</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">{job.position} Positions</Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">{job.jobType}</Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">{job.salary} LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={() => navigate(`/description/${job._id}`)}>Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
});

export default Job;