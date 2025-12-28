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
  gender: string | null;
  place_of_birth: string | null;
  date_of_birth: string | null;
  program: string | null;
  admission_year: string | null;
  status: string;
  gpa: number | null;
  image: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  full_address: string | null;
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

export interface ProfileResponse {
  code: number;
  status: string;
  message: string;
  data: {
    student: Student;
  };
}

export interface ChangePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  code: number;
  status: string;
  message: string;
}
