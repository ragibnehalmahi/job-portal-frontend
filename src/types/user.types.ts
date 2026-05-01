export interface UserProfile {
  bio?: string;
  skills: string[];
  resume?: string;
  resumeOriginalName?: string;
  company?: string;
  profilePhoto?: string;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  role: 'student' | 'recruiter';
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
}