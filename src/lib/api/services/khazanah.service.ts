/**
 * Khazanah Service
 * Service untuk mengelola khazanah data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { KhazanahResponse, KhazanahItem, KhazanahQueryParams } from '../types';

class KhazanahService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: KhazanahQueryParams): string {
    const queryParams = new URLSearchParams();

    if (params.category_id !== undefined) {
      queryParams.append('category_id', params.category_id.toString());
    }
    if (params.per_page !== undefined) {
      queryParams.append('per_page', params.per_page.toString());
    }
    if (params.all !== undefined) {
      queryParams.append('all', params.all.toString());
    }
    if (params.search !== undefined && params.search.trim() !== '') {
      queryParams.append('search', params.search.trim());
    }
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get published khazanah with optional filters
   */
  async getPublishedKhazanah(params: KhazanahQueryParams = {}): Promise<KhazanahResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.khazanah.published}${queryString}`;

    return apiClient.get<KhazanahResponse>(url);
  }

  /**
   * Get published khazanah items only (without pagination meta)
   */
  async getPublishedKhazanahItems(params: KhazanahQueryParams = {}): Promise<KhazanahItem[]> {
    const response = await this.getPublishedKhazanah(params);
    return response.data.data;
  }
}

// Export singleton instance
export const khazanahService = new KhazanahService();
