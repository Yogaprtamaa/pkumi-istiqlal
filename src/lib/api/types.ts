/**
 * API Types
 * Type definitions untuk API requests dan responses
 */

export interface LoginRequest {
  nim: string;
  password: string;
}

export interface Student {
  id: number;
  nim: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  image: string | null;
}

export interface LoginResponse {
  code: number;
  status: string;
  message: string;
  data: {
    student: Student;
    token: string;
    token_type: string;
  };
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
