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
  // Article counts
  khazanah_draft_count?: number;
  khazanah_published_count?: number;
  khazanah_archived_count?: number;
  rubrik_draft_count?: number;
  rubrik_published_count?: number;
  rubrik_archived_count?: number;
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

export interface StudentProfileQueryParams {
  type?: 'khazanah' | 'rubrik';
  status?: 'published' | 'draft' | 'archived';
  search?: string;
  per_page?: number;
  page?: number;
}

export interface StudentProfileWithContentResponse {
  code: number;
  status: string;
  message: string;
  data: {
    student: Student;
    khazanahs?: KhazanahData;
    rubriks?: RubrikData;
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
  excerpt: string | null;
  tags: string | null;
  thumbnail: string | null;
  status: string;
  published_at: string;
  views_count?: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  views?: number;
  student?: KhazanahStudent;
  author?: KhazanahStudent; // Untuk kompatibilitas dengan berbagai endpoint
  category?: KhazanahCategory;
}

export interface KhazanahDetail extends KhazanahItem {
  views?: number;
  trix_rich_texts?: TrixRichText[];
  tags_array?: string[];
  content?: string; // Processed content from trix_rich_texts
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

export interface KhazanahDetailResponse {
  code: number;
  status: string;
  message: string;
  data: KhazanahDetail;
}

export interface KhazanahQueryParams {
  category_id?: number;
  per_page?: number;
  all?: boolean;
  search?: string;
  page?: number;
}

// Artikel interfaces (similar structure to Khazanah)
export interface ArtikelStudent {
  id: number;
  name: string;
  nim: string;
}

export interface ArtikelCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ArtikelItem {
  id: number;
  student_id: number;
  category_id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  tags: string;
  thumbnail: string | null;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  student: ArtikelStudent;
  category: ArtikelCategory;
  views?: number;
  read_time?: number;
}

export interface ArtikelData extends PaginationMeta {
  data: ArtikelItem[];
}

export interface ArtikelResponse {
  code: number;
  status: string;
  message: string;
  data: ArtikelData;
}

export interface ArtikelQueryParams {
  category_id?: number;
  per_page?: number;
  all?: boolean;
  search?: string;
  page?: number;
}

// Rubrik interfaces (similar structure to Khazanah and Artikel)
export interface RubrikStudent {
  id: number;
  name: string;
  nim: string;
  email?: string;
}

export interface RubrikCategory {
  id: number;
  name: string;
  slug: string;
}

export interface TrixRichText {
  id: number;
  field: string;
  content: string;
  record_type: string;
  record_id: number;
  created_at: string;
  updated_at: string;
}

export interface RubrikItem {
  id: number;
  category_id: number;
  author_id: number;
  author_type: string; // "App\\Models\\Student" atau "App\\Models\\User"
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string | null;
  thumbnail: string | null;
  status: string;
  published_at: string;
  views_count?: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  views?: number;
  student?: RubrikStudent; // Deprecated, gunakan author
  author?: RubrikStudent; // Author bisa Student atau User
  category?: RubrikCategory;
}

export interface RubrikDetail extends RubrikItem {
  trix_rich_texts?: TrixRichText[];
  tags_array?: string[];
  content?: string; // Processed content from trix_rich_texts
}

export interface RubrikData extends PaginationMeta {
  data: RubrikItem[];
}

export interface RubrikResponse {
  code: number;
  status: string;
  message: string;
  data: RubrikData;
}

export interface RubrikQueryParams {
  category_id?: number;
  per_page?: number;
  all?: boolean;
  search?: string;
  page?: number;
}

export interface RubrikDetailResponse {
  code: number;
  status: string;
  message: string;
  data: RubrikDetail;
}
