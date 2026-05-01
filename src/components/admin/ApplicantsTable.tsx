import React from 'react';
import axios from '../../utils/axiosInstance';
import { toast } from 'sonner';
import { useAppSelector } from '../../hooks/useTypedSelector';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';

const statusOptions = ['accepted', 'rejected'];

const ApplicantsTable: React.FC = () => {
  const { applicants } = useAppSelector((state) => state.application);

  const statusHandler = async (status: string, applicationId: string) => {
    try {
      const res = await axios.post(`/application/status/${applicationId}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally refresh data
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  if (!applicants?.applications?.length) {
    return <div className="text-center py-10">No applications found</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of applicants for this job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.applications.map((app: any) => (
            <TableRow key={app._id}>
              <TableCell>{app.applicant?.fullname}</TableCell>
              <TableCell>{app.applicant?.email}</TableCell>
              <TableCell>{app.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {app.applicant?.profile?.resume ? (
                  <a
                    href={app.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 cursor-pointer"
                  >
                    {app.applicant.profile.resumeOriginalName || 'Resume'}
                  </a>
                ) : (
                  'NA'
                )}
              </TableCell>
              <TableCell>{app.applicant?.createdAt?.split('T')[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        onClick={() => statusHandler(status, app._id)}
                        className="flex w-fit items-center my-2 cursor-pointer"
                      >
                        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;