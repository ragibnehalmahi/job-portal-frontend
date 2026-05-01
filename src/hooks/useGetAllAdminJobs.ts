import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from './useTypedSelector';
import { setAllAdminJobs } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';
import { Job } from '../types/job.types';

const useGetAllAdminJobs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get<{ success: boolean; jobs: Job[] }>(
          `${JOB_API_END_POINT}/getadminjobs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;