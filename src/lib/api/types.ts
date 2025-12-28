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

// Category interfaces
export interface Category {
  id: number;
  name: string;
  slug: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface CategoriesData extends PaginationMeta {
  data: Category[];
}

export interface CategoriesResponse {
  code: number;
  status: string;
  message: string;
  data: CategoriesData;
}

// Khazanah interfaces
export interface KhazanahStudent {
  id: number;
  name: string;
  nim: string;
}

export interface KhazanahCategory {
  id: number;
  name: string;
  slug: string;
}

export interface KhazanahItem {
  id: number;
  student_id: number;
  category_id: number;
  title: string;
  slug: string;
  excerpt: string;
  tags: string;
  thumbnail: string | null;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  student: KhazanahStudent;
  category: KhazanahCategory;
}

export interface KhazanahData extends PaginationMeta {
  data: KhazanahItem[];
}

export interface KhazanahResponse {
  code: number;
  status: string;
  message: string;
  data: KhazanahData;
}

export interface KhazanahQueryParams {
  category_id?: number;
  per_page?: number;
  all?: boolean;
  search?: string;
  page?: number;
}
