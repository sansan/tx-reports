export type ApiResponse<T> = {
  code: '200' | string;
  data: T;
  error?: string | null;
};

export type Project = {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
};

export type ProjectsApiResponse = ApiResponse<Project[]>;

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserApiResponse = ApiResponse<User[]>;

export type Gateway = {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
};

export type GatewayApiResponse = ApiResponse<Gateway[]>;

export type ReportApiRequestBody = {
  from?: string;
  to?: string;
  projectId?: string;
  gatewayId?: string;
};

export type Payment = {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string;
  modified: string;
  created: string;
};

export type ReportApiResponse = ApiResponse<Payment[]>;
