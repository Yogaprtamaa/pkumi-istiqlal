/**
 * Rubrik Service
 * Service untuk mengelola rubrik data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { RubrikResponse, RubrikItem, RubrikQueryParams, RubrikDetailResponse, RubrikDetail } from '../types';

class RubrikService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: RubrikQueryParams): string {
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
    // Only append search if it has at least 3 characters
    if (params.search !== undefined && params.search.trim().length >= 3) {
      queryParams.append('search', params.search.trim());
    }
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get published rubrik with optional filters
   * @param params - Query parameters including search (min 3 chars), category_id, per_page, all, page
   */
  async getPublishedRubrik(params: RubrikQueryParams = {}): Promise<RubrikResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.rubrik.published}${queryString}`;

    return apiClient.get<RubrikResponse>(url);
  }

  /**
   * Get published rubrik items only (without pagination meta)
   */
  async getPublishedRubrikItems(params: RubrikQueryParams = {}): Promise<RubrikItem[]> {
    const response = await this.getPublishedRubrik(params);
    return response.data.data;
  }

  /**
   * Get rubrik detail by slug
   * @param slug - Rubrik slug
   */
  async getRubrikBySlug(slug: string): Promise<RubrikDetail> {
    const url = `${API_ENDPOINTS.rubrik.detail}/${slug}`;
    const response = await apiClient.get<RubrikDetailResponse>(url);

    // Extract content from trix_rich_texts array
    const rubrikData = response.data;
    if (rubrikData.trix_rich_texts && rubrikData.trix_rich_texts.length > 0) {
      const contentItem = rubrikData.trix_rich_texts.find(item => item.field === 'content');
      if (contentItem) {
        rubrikData.content = contentItem.content;
      }
    }

    return rubrikData;
  }
}

// Export singleton instance
export const rubrikService = new RubrikService();
