import { Company } from './company.types';
import { Application } from  './application.types';

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: Company | string;
  created_by: string;
  applications: Application[] | string[];
  createdAt: string;
  updatedAt: string;
}