/**
 * Khazanah Service
 * Service untuk mengelola khazanah data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { KhazanahResponse, KhazanahItem, KhazanahQueryParams, KhazanahDetailResponse, KhazanahDetail } from '../types';

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

  /**
   * Get khazanah detail by slug
   * @param slug - Khazanah slug
   */
  async getKhazanahBySlug(slug: string): Promise<KhazanahDetail> {
    const url = `${API_ENDPOINTS.khazanah.detail}/${slug}`;
    const response = await apiClient.get<KhazanahDetailResponse>(url);

    // Extract content from trix_rich_texts array
    const khazanahData = response.data;
    if (khazanahData.trix_rich_texts && khazanahData.trix_rich_texts.length > 0) {
      const contentItem = khazanahData.trix_rich_texts.find(item => item.field === 'content');
      if (contentItem) {
        khazanahData.content = contentItem.content;
      }
    }

    return khazanahData;
  }
}

// Export singleton instance
export const khazanahService = new KhazanahService();
