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
  user: UserType;
  reviews: ReviewType[];
};

export type ReviewType = {
  id: string;
  action: number;
  created_at: Date;
  observation: null | string;
  user: UserType;
};

export type ResponseRequest = {
  data: RequestType[];
  total: number;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  role: number;
  created_at: Date;
};

export type DatabasesType = {
  label: string;
  value: string;
}[];

export type ConfigType = {
  id?: string;
  content: string;
  created_at?: Date;
};
