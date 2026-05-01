export interface ApiResponse<T = any> {
  message: string;
  success: boolean;
  data?: T;
  user?: T;
  job?: T;
  jobs?: T[];
  company?: T;
  companies?: T[];
  application?: T;
  applications?: T[];
}