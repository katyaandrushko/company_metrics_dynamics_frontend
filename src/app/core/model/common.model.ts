export interface User {
  password: any;
  age: any;
  _id: string;
  email: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  status?: boolean;
  message?: string;
  error?: string;
  token?: string;
  data: T;
}

export interface Company {
  _id: string;
  name: string;
  bankDetails: string;
  phone: string;
  contactPerson: string;
}

export interface Metric {
  _id: string;
  name: string;
  importance: string;
  measure: string;
}
