export type RequestType = {
  id: string;
  databases: string;
  ddl_command: string;
  description: string;
  host: string;
  schedule: null | Date;
  status: number;
  time_to_run: string;
  created_at: Date;
  user: {
    id: string;
    email: string;
    name: string;
    role: number;
    created_at: Date;
  };
};

export type ResponseRequest = {
  data: RequestType[];
  total: number;
};

export type UserType = {
  name: string;
  email: string;
  role: number;
};
