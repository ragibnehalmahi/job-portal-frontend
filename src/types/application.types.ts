import { Job } from './job.types';
import { User } from './user.types';

export interface Application {
  _id: string;
  job: Job | string;
  applicant: User | string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}