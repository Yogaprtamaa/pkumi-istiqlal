/**
 * Student Service
 * Service untuk mengelola student profile dan content (khazanah & rubrik)
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { StudentProfileQueryParams, StudentProfileWithContentResponse } from '../types';

class StudentService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: StudentProfileQueryParams): string {
    const queryParams = new URLSearchParams();

    if (params.type !== undefined) {
      queryParams.append('type', params.type);
    }
    if (params.status !== undefined) {
      queryParams.append('status', params.status);
    }
    if (params.search !== undefined && params.search.trim() !== '') {
      queryParams.append('search', params.search.trim());
    }
    if (params.per_page !== undefined) {
      queryParams.append('per_page', params.per_page.toString());
    }
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get student profile with optional content (khazanah or rubrik)
   * @param params - Query parameters including type (khazanah/rubrik), status, search, per_page, page
   */
  async getProfileWithContent(params: StudentProfileQueryParams = {}): Promise<StudentProfileWithContentResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.auth.profile}${queryString}`;

    return apiClient.get<StudentProfileWithContentResponse>(url, true);
  }
}

// Export singleton instance
export const studentService = new StudentService();
