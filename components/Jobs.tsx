import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/useTypedSelector';
import useGetAllJobs from '../hooks/useGetAllJobs';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

const JOBS_PER_PAGE = 6;

const Jobs: React.FC = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery, loading } = useAppSelector((state) => state.job);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = React.useMemo(() => {
    if (!searchedQuery) return allJobs;
    return allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
    );
  }, [allJobs, searchedQuery]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex gap-5">
            <div className="w-1/5"><Skeleton className="h-96 w-full" /></div>
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-md" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5"><FilterCard /></div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {paginatedJobs.length === 0 ? (
              <div className="text-center py-10">No jobs found</div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {paginatedJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  <Button variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                  <span className="py-2 px-4">Page {currentPage} of {totalPages}</span>
                  <Button variant="outline" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;